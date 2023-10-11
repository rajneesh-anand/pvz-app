import Layout from "@components/layout";
import axios from "axios";
import GiftList from "@components/gift/gift-list";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";

export default function GiftPage({ giftList }) {
  console.log(giftList);
  return (
    <>
      <Seo
        title="Gifts"
        description="Выиграйте захватывающие призы , Купите продукт И выиграйте монеты"
        canonical="/gifts"
      />
      <GiftList data={giftList} />
    </>
  );
}

GiftPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  } else {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/user/gifts/${session?.user?.mobile}`
    );

    return {
      props: { giftList: data.results },
    };
  }
};
