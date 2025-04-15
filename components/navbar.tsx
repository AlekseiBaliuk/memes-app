"use client";

import { Navbar, NavbarContent, NavbarItem } from "@heroui/react";
import NavLink from "./nav-link";

export default function NavBar() {
  return (
    <Navbar>
      <NavLink href="/" text="Home" />

      <NavbarContent
        className="sm:flex gap-8 w-full items-center justify-end p-6"
        justify="center"
      >
        <NavbarItem>
          <NavLink href="/table" text="Table" />
        </NavbarItem>
        <NavbarItem>
          <NavLink href="/list" text="List" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
