import React, { useState } from "react";
import Link from "@components/ui/link";
import { useRouter } from "next/router";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import CloseIcon from "@assets/icons/close-icon";
import { useSession, signOut } from "next-auth/react";
import { sidebarNavItems } from "@data/constant";
import Container from "@components/ui/container";
import ProductIcon from "@assets/icons/product-icon";
import ProfilIcon from "@assets/icons/profile-icon";
import LogoutIcon from "@assets/icons/logout-icon";
import UserIcon from "@assets/icons/user-icon";
import HelpIcon from "@assets/icons/help-icon";
import MessageIcon from "@assets/icons/message-icon";

function maskMobileNumber(number) {
  return (
    "+7" +
    " " +
    number.slice(0, 3) +
    " " +
    number.slice(3, 6) +
    "-" +
    number.slice(6, 10)
  );
}

export default function MobileMenu() {
  const { closeSidebar } = useUI();
  const { data: session, status } = useSession();
  const { pathname } = useRouter();

  return (
    <>
      <div className="overflow-hidden px-4 bg-orange-300/10  flex items-center justify-between w-full h-14 border-b border-orange-700/10 ">
        <p className=" font-semibold text-orange-700 text-lg">Мой профайл</p>
        <button
          className="inline-flex items-center justify-center w-8 h-8 transition duration-200 text-base text-opacity-50 focus:outline-none  hover:text-opacity-100 bg-orange-700 rounded-full"
          onClick={closeSidebar}
          aria-label="close"
        >
          <CloseIcon color="#fff" />
        </button>
      </div>

      <Container>
        <div className="flex flex-col justify-center items-center mt-8">
          {session && (
            <>
              <img
                src={session?.user?.image ?? "/images/placeholder/avatar.svg"}
                alt={session?.user?.name}
                className="w-24 h-24 p-1 rounded-full ring-2 ring-gray-300 "
              />
              <p className="text-[18px] font-medium mt-1 uppercase ">
                {session?.user?.name}
              </p>
              <p className="text-[16px] font-medium mt-1  ">
                {session?.user?.email}
              </p>

              <p className="text-[18px] font-medium mt-1 uppercase ">
                {maskMobileNumber(session?.user?.mobile)}
              </p>
            </>
          )}
        </div>
        <div className="w-full px-8 pt-8">
          <Link
            href="/profile"
            className="inline-flex py-4 mb-2 border-b border-gray-500 w-full"
          >
            <UserIcon color="#FF7643" />
            <p
              className="ml-2 font-medium text-slate-700 text-md"
              onClick={closeSidebar}
            >
              Изменить личную информацию
            </p>
          </Link>
          <Link
            href="/"
            className="inline-flex py-4 mb-2 border-b border-gray-500 w-full"
          >
            <MessageIcon color="#FF7643" />
            <p
              className="ml-2 font-medium text-slate-700 text-md"
              onClick={closeSidebar}
            >
              Отправьте свои отзывы
            </p>
          </Link>
          <Link
            href="/"
            className="inline-flex py-4 mb-2 border-b border-gray-500 w-full"
          >
            <HelpIcon color="#FF7643" />
            <p
              className="ml-2 font-medium text-slate-700 text-md"
              onClick={closeSidebar}
            >
              Помощь и поддержка
            </p>
          </Link>

          <button
            type="button"
            className="inline-flex py-4 mb-2 border-b border-gray-500 w-full"
            onClick={() => signOut()}
          >
            <LogoutIcon color="#FF7643" />
            <p className="ml-2 font-medium text-slate-700 text-md">Выход</p>
          </button>
        </div>
      </Container>
    </>
  );
}
