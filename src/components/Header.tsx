"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import Cart from "./cart/Cart";
import ProfileDropdown from "./ProfileDropdown";
import { user } from "@/lib/constants";
import { usePathname } from "next/navigation";
import AuthModal from "./modals/AuthModal";
import { Menu } from "lucide-react";

const NoSSRLocationModal = dynamic(() => import("./modals/LocationModal"), {
  ssr: false,
});

const Header = () => {
  const pathname = usePathname();

  // TODO Temporary
  return (
    <header className="w-full sticky top-0 z-50 h-20 bg-white shadow-sm shadow-neutral-300">
      <nav className="flex flex-row h-full w-full lg:w-[85%] items-center justify-between p-2 lg:pb-0 lg:pt-0 m-auto">
        <NoSSRLocationModal />
        <Link
          href="/"
          className="flex relative justify-center max-w-16 lg:w-full h-full lg:max-w-36 -order-1 "
        >
          <Image
            src="/logo.webp"
            alt="website-logo-showing-its-name"
            width={80}
            height={80}
            fetchPriority="high"
            className="object-contain m-auto"
            title="Burger Lab"
          />
        </Link>
        <div className="flex flex-row flex-1 gap-1 sm:gap-3 items-center w-full h-full justify-end pl-2 pr-2">
          <hr className="md:inline-block hidden h-10 ml-[4px] mr-[4px] opacity-5 text-black border-black border-solid border-[1px]" />
          <div className="flex items-center h-full">
            <ProfileDropdown user={user.username} />
            {/* <AuthModal /> */}
          </div>
          <hr className=" h-10 ml-[4px] mr-[4px] opacity-5 text-black border-black border-solid border-[1px] md:inline-block hidden" />
          {pathname !== "/checkout" && (
            <Cart
              className="p-2 !py-2 w-auto h-auto md:flex hidden"
              type="CART"
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
