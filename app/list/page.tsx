import CardList from "@/components/card-list";
import { getMemes } from "@/lib/memes";
import { Suspense } from "react";

export default async function ListPage() {
  const memes = await getMemes();

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Suspense fallback={<p>Fetching meals...</p>}>
        <CardList memes={memes} />
      </Suspense>
    </div>
  );
}
