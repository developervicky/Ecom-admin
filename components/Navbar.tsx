import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import Link from "next/link";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import StoreSwitcher from "./StoreSwitcher";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 sm:px-8">
        <MobileNav />
        <Link href="/">
          <h1 className="mr-4 font-semibold tracking-tight ">Ecom.</h1>
        </Link>
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6 hidden lg:flex" />
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" className=" px-4 py-2 text-sm text-black">
            <Link href={"https://ecom--store.vercel.app/"}>Store</Link>
          </Button>
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
