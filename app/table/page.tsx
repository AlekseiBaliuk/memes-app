"use client";

import MemeTable from "@/components/table";
// import { getStoredMemes } from "@/lib/actions";
// import { getValidMemes } from "@/lib/isValidUrl";
import { memesList } from "@/lib/memesList";
// import { getMemes } from "@/lib/memes";
import { Suspense, useEffect } from "react";

export default function TablePage() {
  // const memes = await getMemes();
  // const validMemes = await getValidMemes(memes);

  useEffect(() => {
    const stored = localStorage.getItem("memes");
    if (!stored) {
      localStorage.setItem("memes", JSON.stringify(memesList));
    }
  }, []);

  return (
    <div className="flex justify-center min-h-screen px-4">
      <Suspense fallback={<p>Fetching memes...</p>}>
        <MemeTable />
        {/* <MemeTable memes={validMemes} /> */}
      </Suspense>
    </div>
  );
}
