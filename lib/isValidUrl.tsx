import { Meme } from "./types";

export async function isImageUrlValid(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok && !!res.headers.get("content-type")?.startsWith("image/");
  } catch {
    return false;
  }
}

export async function getValidMemes(memes: Meme[]) {
  const results = await Promise.all(
    memes.map(async (meme) => {
      const isValid = await isImageUrlValid(meme.image);

      return { ...meme, isValidUrl: isValid };
    })
  );

  return results;
}
