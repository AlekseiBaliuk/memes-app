"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { Meme } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredMemes } from "@/lib/utils";

interface IProps {
  selectedMemeId: string | null;
}
export default function EditModal({ selectedMemeId }: IProps) {
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(
    getStoredMemes().find((meme) => meme.id === parseInt(selectedMemeId!)) ??
      null
  );

  const { back } = useRouter();
  // const [state, formAction] = useActionState(editMeme, {
  //   message: "idle",
  //   newMeme: {
  //     id: 0,
  //     title: "",
  //     image: "",
  //     link: "",
  //     likes: 0,
  //   },
  // });

  // const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

  // useEffect(() => {
  //   if (!selectedMemeId) return;

  //   const memes = getStoredMemes();
  //   const meme = memes.find((meme) => meme.id === parseInt(selectedMemeId));
  //   setSelectedMeme(meme ?? null);
  // }, [selectedMemeId]);

  // useEffect(() => {
  //   if (message === "success") {
  //     // const memes = getStoredMemes();
  //     // const updatedMemes = memes.map((meme) =>
  //     //   meme.id === state?.newMeme?.id ? state.newMeme : meme
  //     // );
  //     // setSelectedMeme(state.newMeme ?? null);
  //     // localStorage.setItem("memes", JSON.stringify(updatedMemes));
  //     // window.dispatchEvent(new Event("memesUpdated"));
  //     back();
  //   }
  // }, [back, selectedMemeId]);

  const saveMeme = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedMeme) return;
    const memes = getStoredMemes();
    const updatedMemes = memes.map((meme) =>
      meme.id === selectedMeme.id ? selectedMeme : meme
    );

    localStorage.setItem("memes", JSON.stringify(updatedMemes));
    window.dispatchEvent(new Event("memesUpdated"));
    back();
  };

  return (
    <div className="modal-backdrop">
      <Modal
        isOpen={!!selectedMemeId}
        onOpenChange={back}
        placement="center"
        backdrop="blur"
        size="md"
        hideCloseButton
      >
        <ModalContent className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl backdrop-blur-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
          <ModalHeader className="flex items-center justify-between gap-1">
            <span>Edit Meme</span>
            <Button isIconOnly variant="light" onPress={back}>
              x
            </Button>
          </ModalHeader>
          <form onSubmit={saveMeme}>
            <ModalBody>
              <input type="hidden" name="id" value={selectedMeme?.id || ""} />
              <input
                type="hidden"
                name="link"
                value={selectedMeme?.link || ""}
              />
              <Input
                isReadOnly
                label="ID"
                value={selectedMeme?.id.toString() || ""}
                variant="bordered"
              />
              <Input
                label="Title"
                name="title"
                defaultValue={selectedMeme?.title || ""}
                variant="bordered"
                required
                value={selectedMeme?.title || ""}
                validate={(value) => {
                  if (!value || value.length < 3 || value.length > 100)
                    return "Title is required";
                  return true;
                }}
                onChange={(e) =>
                  setSelectedMeme(
                    selectedMeme
                      ? { ...selectedMeme, title: e.target.value }
                      : null
                  )
                }
              />
              <Input
                label="Image URL"
                name="image"
                defaultValue={selectedMeme?.image || ""}
                variant="bordered"
                value={selectedMeme?.image || ""}
                validate={(value) => {
                  if (!value) return "Image URL is required";
                  if (!value || !value.match(/\.(jpg|jpeg)$/i))
                    return "Image URL is required";
                  return true;
                }}
                onChange={(e) =>
                  setSelectedMeme(
                    selectedMeme
                      ? { ...selectedMeme, image: e.target.value }
                      : null
                  )
                }
              />
              <Input
                label="Likes"
                name="likes"
                type="number"
                defaultValue={selectedMeme?.likes.toString() || ""}
                value={selectedMeme?.likes.toString() || ""}
                variant="bordered"
                onChange={(e) =>
                  setSelectedMeme(
                    selectedMeme
                      ? { ...selectedMeme, likes: +e.target.value }
                      : null
                  )
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={back}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </ModalFooter>
          </form>
          {/* {state.message !== "idle" && (
            <p className="text-red-500 text-sm mt-2">{state.message}</p>
          )} */}
        </ModalContent>
      </Modal>
    </div>
  );
}
