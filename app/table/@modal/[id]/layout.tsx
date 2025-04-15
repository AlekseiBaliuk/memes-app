import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function TableLayout({ children, modal }: IProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
