"use client";

import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "@/app/types/Post";
import AddComment from "@/app/components/AddComment";
import Image from "next/image";



type URL = {
  params: {
    slug: string;
  };
};

// Fetch details
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`../api/posts/${slug}`);
  return response.data;
};

const PostDetail = (url: URL) => {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading...";
  return (
    <div>
      <Post
        avatar={data?.user.image}
        name={data?.user.name}
        postTitle={data?.title}
        id={data?.id}
        comments={data?.comments}
      />
      {/* @ts-ignore */}
      <AddComment id={data.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={comment.user.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment.user.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
