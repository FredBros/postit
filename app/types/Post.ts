export type PostType = {
  title: string;
  id: string;
  createdAt: string;
  updatedAt?: string;
  user: {
    name: string;
    image: string;
    email: string;
    id: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    message: string;
    user: {
      name: string;
      image: string;
      email: string;
      id: string;
    };
  }[];
};
