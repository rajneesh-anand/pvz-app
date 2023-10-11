import Layout from "@components/layout";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import dynamic from "next/dynamic";

const ProfileForm = dynamic(() => import("@components/form/profile-form"), {
  ssr: false,
});

export default function ProfilePage() {
  return (
    <>
      <Seo
        title="Profile Information"
        description="Выиграйте захватывающие призы , Купите продукт И выиграйте монеты"
        canonical="/profile"
      />
      <ProfileForm />
    </>
  );
}

ProfilePage.Layout = Layout;

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
