"use client";

import { Card, CardHeader, CardBody, Image, Link } from "@heroui/react";
import { Meme } from "@/lib/types";

interface IProps {
  memes: Meme[];
}

export default function CardList({ memes }: IProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {memes.map((meme) => (
        <Link
          key={meme.id}
          href={meme.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card
            key={meme.id}
            className="py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-sm font-bold">{meme.title}</p>
              <small className="text-default-500">{meme.likes} likes</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex justify-center">
              <Image
                alt={meme.title}
                className="object-cover rounded-xl"
                src={meme.image}
                width={270}
                height={200}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
