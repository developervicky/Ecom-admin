"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Button } from "./ui/button";

type NavRoutes = { href: string; label: string; active: boolean }[];

const MobileNav = () => {
  const pathname = usePathname();
  const params = useParams();

  const { storeId } = params;
  const routes: NavRoutes = navRoutes({
    storeId,
    pathname,
  });

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="items-start pl-0 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          >
            <Menu className=" h-6 w-6 " />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] lg:hidden">
          <SheetHeader>
            <SheetTitle className="text-left font-semibold tracking-tight ">
              Ecom.
            </SheetTitle>
          </SheetHeader>
          <nav className="!mt-10 ml-3 flex flex-col items-start space-y-4">
            {routes.map((route) => (
              <Link
                href={route.href}
                key={route.href}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  route.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground",
                )}
              >
                <SheetClose>{route.label}</SheetClose>
              </Link>
            ))}
          </nav>
          <SheetFooter className="absolute bottom-4 right-4 text-muted-foreground">
            The place for sellers 🙏
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
