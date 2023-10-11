import React, { useState } from "react";
import Alert from "@components/ui/alert";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Container from "@components/ui/container";
import { useHookFormMask } from "use-mask-input";
import Link from "@components/ui/link";
import PhoneInput from "@components/ui/form/phone-input";
import PasswordIcon from "@components/ui/form/password-icon";

export default function SignInForm({ csrfToken }) {
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerWithMask = useHookFormMask(register);

  async function onSubmit({ mobile, password }) {
    const formattedMobile = mobile.slice(-13).replace(/[\s.-]/g, "");
    const result = await signIn("credentials", {
      redirect: false,
      mobile: formattedMobile,
      password: password,
    });

    if (result?.error) {
      console.log(result.error);
      setError(result?.error);
    } else {
      router.push("/");
    }
  }
  return (
    <Container>
      <div className="flex items-center justify-center h-screen">
        <div className="m-auto max-w-md w-full py-8 px-4">
          <div className="inline-flex justify-center w-full mb-8 ">
            <img
              src="/images/hero/pup.svg"
              alt="welcome"
              className="w-40 h-40"
            />
          </div>
          <div className="mt-4  mb-8 text-center">
            <p className="font-semibold text-indigo-900 text-[13px] bg-amber-100 rounded-lg p-2 ">
              Войдите с помощью номера мобильного телефона и пароля
            </p>
          </div>
          {error && (
            <Alert
              message={error}
              variant="error"
              closeable={true}
              className="my-4"
              onClose={() => setError(null)}
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <PhoneInput
              {...registerWithMask("mobile", ["+7 999 999-99-99"], {
                required: "Номер мобильного телефона обязателен!",
              })}
              label="Номер мобильного телефона"
              labelClassName="text-orange-500"
              iconClass="icon_mobile text-orange-500"
              variant="outline"
              className="mb-4"
              placeholder="Введите номер мобильного телефона"
              error={errors.mobile?.message}
            />

            <PasswordIcon
              label="Пароль"
              labelClassName="text-orange-500"
              iconClass="icon_lock text-orange-500"
              variant="outline"
              className="mb-4"
              placeholder="Введите ваш пароль"
              {...register("password", {
                required: "Необходим пароль!",
              })}
              error={errors.password?.message}
            />

            <div className="relative">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full  px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange-500/90 rounded-sm shadow-sm focus:outline-none hover:bg-opacity-90"
              >
                Войти
              </button>
            </div>
          </form>

          <div className="mt-16 text-[14px] lg:text-[14px] font-medium text-center">
            У вас нет учетной записи ?
            <Link
              href="/auth/register"
              className="text-orange-500 text-[14px] ml-2 underline hover:no-underline focus:outline-none"
            >
              Завести аккаунт
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
