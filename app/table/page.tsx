import MemeTable from "@/components/table";
import { getValidMemes } from "@/lib/isValidUrl";
import { getMemes } from "@/lib/memes";
import { Suspense } from "react";

export default async function TablePage() {
  const memes = await getMemes();
  const validMemes = await getValidMemes(memes);

  return (
    <div className="flex justify-center min-h-screen px-4">
      <Suspense fallback={<p>Fetching memes...</p>}>
        <MemeTable memes={validMemes} />
      </Suspense>
    </div>
  );
}
