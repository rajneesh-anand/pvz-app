import React from "react";
import { getCsrfToken, getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@components/form/signin-form"), {
  ssr: false,
});

export default function LoginPage({ csrfToken }) {
  return (
    <>
      <Seo
        title="Sign In"
        description="Выиграйте захватывающие призы , Купите продукт И выиграйте монеты"
        canonical="/auth/signin"
      />
      <SignInForm csrfToken={csrfToken} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const csrfToken = await getCsrfToken(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { csrfToken },
    };
  }
};
