import { ReactNode } from "react";

interface IProps {
  children: ReactNode | null;
  modal: ReactNode | null;
}

export default function TableLayout({ children, modal }: IProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
