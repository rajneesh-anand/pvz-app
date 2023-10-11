import Layout from "@components/layout";
import axios from "axios";
import { getSession } from "next-auth/react";
import ProductDetail from "@components/product/product-detail";
import Seo from "@components/common/seo";

export default function ProductPage({ product }) {
  return (
    <>
      <Seo
        title={product.name}
        description={product.description}
        canonical="/"
      />
      <ProductDetail data={product} />
    </>
  );
}

ProductPage.Layout = Layout;

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
    const { slug } = ctx.params;
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/item/product/${slug}`
    );

    return {
      props: { product: data.product },
    };
  }
};
