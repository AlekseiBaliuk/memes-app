import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: IProps) {
  const pathname = usePathname();

  return (
    <Link
      color="foreground"
      href={href}
      className={pathname === href ? "active" : ""}
    >
      {text}
    </Link>
  );
}
