import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import Link from "next/link";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import StoreSwitcher from "./StoreSwitcher";
import { ModeToggle } from "./ModeToggle";

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
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
