import React from "react";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <>
      <Separator />
      <footer className=" py-6 text-center text-muted-foreground dark:text-gray-300">
        <small className="text-base">
          Copyright <span className="text-primary">&copy;</span> 2024 | Vignesh
          Kathiresan
        </small>
      </footer>
    </>
  );
}
