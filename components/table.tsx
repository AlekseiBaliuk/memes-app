"use client";

import React, { SVGProps, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@heroui/react";
import { Meme } from "@/lib/types";
import Link from "next/link";
// import { memesList } from "@/lib/memesList";
import { getStoredMemes } from "@/lib/utils";
import { getValidMemes } from "@/lib/isValidUrl";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  { name: "ID", uid: "id" },
  { name: "TITLE", uid: "title" },
  { name: "PICTURE", uid: "image" },
  { name: "LIKES", uid: "likes" },
  { name: "ACTIONS", uid: "actions" },
];

export const EditIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

// interface IProps {
//   memes: Meme[];
// }

export default function MemeTable() {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const loadMemes = async () => {
      const stotedMemes = getStoredMemes();
      const validMemes = await getValidMemes(stotedMemes);
      setMemes(validMemes);
    };

    loadMemes();
    const stotedMemes = getStoredMemes();
    setMemes(stotedMemes);

    window.addEventListener("memesUpdated", loadMemes);

    return () => {
      window.removeEventListener("memesUpdated", loadMemes);
    };
  }, []);

  const renderCell = async (meme: Meme, columnKey: string) => {
    const cellValue = meme[columnKey as keyof Meme];

    switch (columnKey) {
      case "id":
      case "title":
      case "likes":
        return <p className="text-sm text-default-500">{cellValue}</p>;
      case "image": {
        if (meme.isValidUrl) {
          return cellValue;
        } else {
          return "";
        }
      }
      case "actions":
        return (
          <div className="flex justify-center">
            <Tooltip content="Edit meme">
              <Link href={`/table/${meme.id}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table aria-label="Meme table" isStriped>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={memes}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell
                className={
                  columnKey === "actions" ? "text-center" : "text-left"
                }
              >
                {renderCell(item, columnKey.toString())}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
