"use client";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className="flex justify-center items-center min-h-screen px-4">
        <p>Welcome to the Meme app</p>
      </main>
    </div>
  );
}
