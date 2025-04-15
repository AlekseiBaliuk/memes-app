import sql from "better-sqlite3";
import { Meme } from "./types";

const db = sql("memes.db");

export async function getMemes() {
  return db.prepare("SELECT * FROM memes").all() as Meme[];
}

export async function getMeme(id: number) {
  return db.prepare("SELECT * FROM memes WHERE id = ?").get(id) as Meme;
}

export function updateMeme(meme: Meme) {
  return db
    .prepare(
      "UPDATE memes SET title = ?, image = ?, likes = ?, link = ? WHERE id = ?"
    )
    .run(meme.title, meme.image, meme.likes, meme.link, meme.id);
}
