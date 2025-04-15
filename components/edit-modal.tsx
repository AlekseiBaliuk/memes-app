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
import { useActionState, useEffect, useState } from "react";
import { editMeme } from "@/lib/actions";
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
  const [state, formAction] = useActionState(editMeme, {
    message: "idle",
    newMeme: {
      id: 0,
      title: "",
      image: "",
      link: "",
      likes: 0,
    },
  });

  useEffect(() => {
    if (state.message === "success") {
      const memes = getStoredMemes();
      const updatedMemes = memes.map((meme) =>
        meme.id === state?.newMeme?.id ? state.newMeme : meme
      );
      localStorage.setItem("memes", JSON.stringify(updatedMemes));
      window.dispatchEvent(new Event("memesUpdated"));
      back();
    }
  }, [back, selectedMemeId, state]);

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
          <form action={formAction}>
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
                validate={(value) => {
                  console.log("🚀 ~ EditModal ~ value:", value);
                  if (!value || value.length < 3 || value.length > 100)
                    return "Title is required";
                  return true;
                }}
              />
              <Input
                label="Image URL"
                name="image"
                defaultValue={selectedMeme?.image || ""}
                variant="bordered"
                validate={(value) => {
                  if (!value) return "Image URL is required";
                  if (!value || !value.match(/\.(jpg|jpeg)$/i))
                    return "Image URL is required";
                  return true;
                }}
              />
              <Input
                label="Likes"
                name="likes"
                type="number"
                defaultValue={selectedMeme?.likes.toString() || ""}
                variant="bordered"
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
          {state.message !== "idle" && (
            <p className="text-red-500 text-sm mt-2">{state.message}</p>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
