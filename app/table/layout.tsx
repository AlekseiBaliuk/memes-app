import { ReactNode } from "react";

export default function TableLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
