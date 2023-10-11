import Layout from "@components/layout";
import axios from "axios";
import UserList from "@components/user/user-list";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import Container from "@components/ui/container";
import UserInfo from "@components/user/user-info";
import UserBalance from "@components/user/user-balance";
import ProductList from "@components/product/product-list";

export default function HomePage() {
  return (
    <>
      <Seo
        title="home"
        description="Выиграйте захватывающие призы , Купите продукт И выиграйте монеты"
        canonical="/"
      />

      <UserInfo />
      <UserBalance />
      <ProductList />
    </>
  );
}

HomePage.Layout = Layout;

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
    return {
      props: {},
    };
  }
};
