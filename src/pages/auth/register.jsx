import React from "react";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";

const RegisterForm = dynamic(() => import("@components/form/register-form"), {
  ssr: false,
});

export default function RegisterPage() {
  return (
    <>
      <Seo
        title="Register"
        description="Выиграйте захватывающие призы , Купите продукт И выиграйте монеты"
        canonical="/auth/register"
      />
      <RegisterForm />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
