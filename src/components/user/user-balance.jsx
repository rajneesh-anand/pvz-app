import React, { useEffect, useState } from "react";
import Link from "@components/ui/link";
import { useSession } from "next-auth/react";
import { useUserInfo } from "@contexts/user.context";

export default function UserBalance() {
  const { data: session, status } = useSession();
  const { balancedCoins, userCoinBalance } = useUserInfo();

  useEffect(() => {
    if (session) {
      userCoinBalance(session?.user?.mobile);
    }
  }, [session]);

  return (
    <div className="flex items-center justify-between py-2 px-4 bg-blue-900">
      {balancedCoins > 0 ? (
        <div className="inline-flex items-center">
          <img
            src="/images/misc/coins.svg"
            alt="coins"
            className="w-12 h-12 "
          />
          <p className="text-white ml-2 font-semibold text-[24px]">
            {balancedCoins}
          </p>
        </div>
      ) : (
        <div className="inline-flex items-center">
          <img
            src="/images/misc/coins.svg"
            alt="coins"
            className="w-12 h-12 "
          />
          <p className="text-white ml-2 font-semibold text-[24px]">0</p>
        </div>
      )}

      <Link href="/info" className="text-white font-normal wide text-md">
        Как заработать награды ?
      </Link>
    </div>
  );
}
