import EditModal from "@/components/edit-modal";
// import { getMeme } from "@/lib/memes";
// import { getStoredMemes } from "@/lib/utils";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function SlugPage({ params }: IProps) {
  const { id } = await params;

  // const meme = await getMeme(parseInt(id));

  if (!id) return null;

  return id ? <EditModal selectedMemeId={id} /> : null;
}
