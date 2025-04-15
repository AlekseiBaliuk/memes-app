"use server";

import { revalidatePath } from "next/cache";
import { updateMeme } from "./memes";

export async function editMeme(
  prvState: Record<string, string>,
  meme: FormData
) {
  const newMeme = {
    id: parseInt(meme.get("id") as string),
    title: meme.get("title") as string,
    image: meme.get("image") as string,
    link: meme.get("link") as string,
    likes: parseInt(meme.get("likes") as string),
  };
  if (!newMeme.title || !newMeme.image || !newMeme.link || !newMeme.likes)
    return {
      message: "Invalid form data",
    };

  updateMeme(newMeme);
  revalidatePath("/table");
  revalidatePath("/list");

  return { message: "success" };
}
