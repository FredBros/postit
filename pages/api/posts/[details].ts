// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
           console.log(req.query);

    try {
     const data= await prisma.post.findUnique({
        where:{
            //@ts-ignore
            id: req.query.details,
        },
        include:{
            user: true,
            comments:{
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    user: true,
                }
            }
        }
     })
     return res.status(200).json(data);
    } catch (err) {
      res
        .status(403)
        .json({ message: "Error has occured while making the post" });
    }
  }
}