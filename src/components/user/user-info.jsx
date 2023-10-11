import React, { useState } from "react";
import Link from "@components/ui/link";
import { useSession } from "next-auth/react";

function maskMobileNumber(number) {
  return (
    "+7" +
    " " +
    number.slice(0, 3) +
    " " +
    number.slice(3, 6) +
    " " +
    number.slice(6, 8) +
    "-" +
    number.slice(8, 10)
  );
}

export default function UserInfo() {
  const { data: session, status } = useSession();

  return (
    <>
      {session && (
        <div className="flex py-4 px-4 bg-orange-50">
          <img
            src={session?.user?.image ?? "/images/placeholder/avatar.svg"}
            alt={session?.user?.name}
            className="w-28 h-28 p-1 rounded-full ring-4 ring-orange-500"
          />
          {/* <img
            className="rounded-full border-4 border-orange-500 "
            src={session?.user?.image ?? "/images/placeholder/avatar.svg"}
            width={128}
            height={128}
            alt={session?.user?.name}
          /> */}
          <div className="ml-4 ">
            <p className="text-[24px] font-medium mt-1  ">
              {session?.user?.name}
            </p>
            <p className="text-[18px] font-medium mt-1 text-gray-600  ">
              {session?.user?.email}
            </p>
            <p className="text-[20px] font-medium mt-1 text-gray-600   ">
              {maskMobileNumber(session?.user?.mobile)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
