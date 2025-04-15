import { memesList } from "./memesList";
import { Meme } from "./types";

const STORAGE_KEY = "memes";

export function getStoredMemes(): Meme[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : memesList;
}

export function saveLocalMemes(memes: Meme[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memes));
}
