import EditModal from "@/components/edit-modal";
import { getMeme } from "@/lib/memes";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function SlugPage({ params }: IProps) {
  const { id } = await params;

  const meme = await getMeme(parseInt(id));

  if (!meme || !id) return null;

  return meme ? <EditModal selectedMeme={meme} /> : null;
}
