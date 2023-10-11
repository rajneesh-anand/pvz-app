import React, { useState } from "react";
import dayjs from "dayjs";
import Alert from "@components/ui/alert";
import Container from "@components/ui/container";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useUserInfo } from "@contexts/user.context";

const ProductDetail = ({ data }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [redeemId, setRedeemId] = useState(null);
  const { data: session, status } = useSession();
  const { balancedCoins } = useUserInfo();
  console.log(data);

  const handleRedeem = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/coin/redeem`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: session?.user?.email,
            name: session?.user?.name,
            mobile: session?.user?.mobile,
            productValue: data.coinValue.toString(),
            spentCoin: data.coinValue,
            product: data.name,
          }),
        }
      );

      const result = await res.json();
      console.log(result);

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setMessage("success");
        setRedeemId(result.redeemId);
      }
    } catch (error) {
      setMessage("failed");
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      {redeemId ? (
        <div className="flex flex-col items-center justify-center min-hscree w-full">
          <h1>{redeemId}</h1>
        </div>
      ) : (
        <div className="w-full min-h-screen mb-16">
          <div className=" flex justify-center items-center h-64 ">
            <img
              className="h-52 rounded-lg object-contain w-52"
              src={data.image ?? "/images/placeholder/product.svg"}
            />
          </div>
          <div className="px-5 py-3 space-y-2">
            <h3 className="text-lg font-semibold">{data.name}</h3>
            <h4 className="text-md font-medium py-4">{data.description}</h4>

            <div className="flex justify-center items-center pt-3 pb-2 ">
              {balancedCoins > data.coinValue ? (
                <button
                  onClick={handleRedeem}
                  className="px-4 py-2 bg-red-600 hover:bg-amber-600 text-center text-sm text-white rounded duration-300"
                >
                  Обменять монеты
                </button>
              ) : (
                <p className="px-4 py-2 bg-red-600 hover:bg-amber-600 text-center text-sm text-white rounded duration-300">
                  У вас недостаточно монет !
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
