"use client";

import CardList from "@/components/card-list";
// import { getMemes } from "@/lib/memes";
import { Meme } from "@/lib/types";
import { getStoredMemes } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";

export default function ListPage() {
  // const memes = await getMemes();

  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const loadMemes = () => {
      const stotedMemes = getStoredMemes();
      setMemes(stotedMemes);
    };

    loadMemes();
    const stotedMemes = getStoredMemes();
    setMemes(stotedMemes);

    window.addEventListener("memesUpdated", loadMemes);

    return () => {
      window.removeEventListener("memesUpdated", loadMemes);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Suspense fallback={<p>Fetching meals...</p>}>
        <CardList memes={memes} />
      </Suspense>
    </div>
  );
}
