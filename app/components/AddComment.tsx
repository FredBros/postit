"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

type CommentType = {
  title: string;
  postId: string;
};

const AddComment = ({ id }: Props) => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string;

  //Create a comment
  const { mutate } = useMutation(
    async (data: CommentType) => axios.post("../api/posts/addComment", { data }),
    {
      onSuccess: (data) => {
        toast.success("Comment had been made successfully", {
          id: commentToastId,
        });
        queryClient.invalidateQueries(["detail-post"]); // invalidate cach to refresh data and display new post.

        setTitle("");
        setIsDisabled(false);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
        setIsDisabled(false);
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    commentToastId = toast.loading("Adding your comment...", {
      id: commentToastId,
    });
    setIsDisabled(true);
    mutate({ title, postId: id });
  };

  return (
    <form className="my-8" onSubmit={submitComment}>
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 tex-lg rouded-md my-2"
        />
      </div>
      <div className={"flex items-center justify-between gap-2"}>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add a comment
        </button>
      </div>
    </form>
  );
};

export default AddComment;
