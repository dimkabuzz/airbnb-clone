"use client";

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import MenuItem from "./MenuItem";

import useLoginModalStore from "@/app/hooks/useLoginModalStore";
import useRegisterModalStore from "@/app/hooks/useRegisterModalStore";
import useRentModalStore from "@/app/hooks/useRentModalStore";

type UserMenuProps = {
  currentUser?: User | null;
};

function UserMenu({ currentUser }: UserMenuProps) {
  const loginModalStore = useLoginModalStore();
  const registerModalStore = useRegisterModalStore();
  const rentModalStore = useRentModalStore();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModalStore.onOpen();
    }

    // Open rent modal
    rentModalStore.onOpen();
  }, [currentUser, loginModalStore, rentModalStore]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="py-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu size={24} />

          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem
                  onClick={rentModalStore.onOpen}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem onClick={signOut} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModalStore.onOpen} label="Login" />
                <MenuItem onClick={registerModalStore.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default UserMenu;
