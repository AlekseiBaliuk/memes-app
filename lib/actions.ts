"use server";

import { revalidatePath } from "next/cache";
import { updateMeme } from "./memes";
import { Meme } from "./types";

export async function editMeme(
  prvState: { message: string; newMeme?: Meme },
  meme: FormData
) {
  const newMeme = {
    id: parseInt(meme.get("id") as string) ?? 0,
    title: (meme.get("title") as string) ?? "",
    image: (meme.get("image") as string) ?? "",
    link: (meme.get("link") as string) ?? "",
    likes: parseInt(meme.get("likes") as string) ?? 0,
  } as Meme;
  if (!newMeme.title || !newMeme.image || !newMeme.link || !newMeme.likes)
    return {
      message: "Invalid form data",
    };

  updateMeme(newMeme);
  revalidatePath("/table");
  revalidatePath("/list");

  return { message: "success", newMeme };
}
