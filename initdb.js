import sql from "better-sqlite3";
const db = sql("memes.db");

const memes = [
  {
    title: "Doge",
    image: "https://i.imgur.com/9nC5V.jpg",
    likes: Math.floor(Math.random() * 100),
    link: "https://knowyourmeme.com/memes/doge",
  },
  {
    title: "Distracted Boyfriend",
    image: "https://i.imgur.com/Jv4LxPI.jpg",
    likes: Math.floor(Math.random() * 100),
    link: "https://knowyourmeme.com/memes/distracted-boyfriend",
  },
  {
    title: "Woman Yelling at a Cat",
    image: "https://i.imgur.com/Xq3F4lY.jpg",
    likes: Math.floor(Math.random() * 100),
    link: "https://knowyourmeme.com/memes/woman-yelling-at-a-cat",
  },
  {
    title: "Success Kid",
    image: "https://i.imgur.com/QUzLdfc.jpg",
    likes: Math.floor(Math.random() * 100),
    link: "https://knowyourmeme.com/memes/success-kid",
  },
  {
    title: "Hide the Pain Harold",
    image: "https://i.imgur.com/2P2qYl1.jpg",
    likes: Math.floor(Math.random() * 100),
    link: "https://knowyourmeme.com/memes/hide-the-pain-harold",
  },
  {
    title: "Drakeposting",
    image: "https://i.imgur.com/DckVpEY.jpg",
    likes: Math.floor(Math.random() * 100),
    link: "https://knowyourmeme.com/memes/drakeposting",
  },
  {
    title: "Is This a Pigeon?",
    image: "https://i.imgur.com/Zv2ZxRt.jpg",
    likes: Math.floor(Math.random() * 100),
    link: "https://knowyourmeme.com/memes/is-this-a-pigeon",
  },
  {
    title: "Change My Mind",
    image: "https://i.imgur.com/T8jQdGA.jpg",
    likes: Math.floor(Math.random() * 100),
    link: "https://knowyourmeme.com/memes/change-my-mind",
  },
  {
    title: "This Is Fine",
    image: "https://i.imgur.com/SJH6N0h.jpg",
    likes: Math.floor(Math.random() * 100),
    link: "https://knowyourmeme.com/memes/this-is-fine",
  },
  {
    title: "One Does Not Simply",
    image: "https://i.imgur.com/TxjBqcf.jpg",
    likes: Math.floor(Math.random() * 100),
    link: "https://knowyourmeme.com/memes/one-does-not-simply-walk-into-mordor",
  },
];

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS memes (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       likes INTEGER NOT NULL,
       link TEXT NOT NULL
    )
`
).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO memes VALUES (
         null,
         @title,
         @image,
         @likes,
         @link
      )
   `);

  for (const meme of memes) {
    stmt.run(meme);
  }
}

initData();
