import React, { useState } from "react";
import Alert from "@components/ui/alert";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Seo from "@components/common/seo";
import Container from "@components/ui/container";
import { useHookFormMask } from "use-mask-input";
import Link from "@components/ui/link";
import PhoneInput from "@components/ui/form/phone-input";
import PasswordIcon from "@components/ui/form/password-icon";
import InputIcon from "@components/ui/form/input-icon";
import Spinner from "@components/ui/spinner";

export default function RegisterForm() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerWithMask = useHookFormMask(register);

  async function onSubmit({ mobile, password, email, name }) {
    setProcessing(true);
    const formattedMobile = mobile.slice(-13).replace(/[\s.-]/g, "");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: formattedMobile,
            password,
            email,
            name,
            fcmToken: "",
          }),
        }
      );
      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        router.push("/auth/signin");
      }
    } catch (error) {
      setProcessing(false);
      setMessage("error");
      setError(error.message);
      console.log(error.message);
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
              Заполните форму ниже, чтобы создать учетную запись
            </p>
          </div>
          {error && (
            <Alert
              message={error}
              variant={message}
              closeable={true}
              className="my-4"
              onClose={() => setError(null)}
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputIcon
              label="Полное имя"
              iconClass="icon_profile text-orange-500"
              labelClassName="text-orange-500"
              variant="outline"
              className="mb-4"
              placeholder="Введите свое полное имя"
              {...register("name", {
                required: "Требуется полное имя!",
              })}
              error={errors.name?.message}
            />
            <PhoneInput
              {...registerWithMask("mobile", ["+7 999 999-99-99"], {
                required: "Номер мобильного телефона обязателен!",
              })}
              label="Номер мобильного телефона"
              iconClass="icon_mobile text-orange-500"
              labelClassName="text-orange-500"
              variant="outline"
              className="mb-4"
              placeholder="Введите номер мобильного телефона"
              error={errors.mobile?.message}
            />

            <InputIcon
              label="Электронная почта"
              iconClass="icon_mail text-orange-500"
              labelClassName="text-orange-500"
              variant="outline"
              className="mb-4"
              placeholder="Введите адрес электронной почты "
              type="email"
              {...register("email", {
                required: "Электронная почта обязательна!",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Формат электронной почты неправильный!",
                },
              })}
              error={errors.email?.message}
            />

            <PasswordIcon
              label="Пароль"
              iconClass="icon_lock text-orange-500"
              labelClassName="text-orange-500"
              variant="outline"
              className="mb-4"
              placeholder="Введите ваш пароль"
              {...register("password", {
                required: "Необходим пароль!",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "пароль должен содержать минимум 8 символов, хотя бы одну заглавную и строчную букву",
                },
              })}
              error={errors.password?.message}
            />

            <div className="relative">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full  px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange-500/90 rounded-sm shadow-sm focus:outline-none hover:bg-opacity-90"
              >
                {processing ? "Регистрация... " : "Зарегистрироваться"}
              </button>
            </div>
          </form>
          <p className="mt-2 text-[10px]">
            Создавая учетную запись, вы соглашаетесь с нашими
            <Link
              href="https://yasha64.ru/privacy-policy"
              target="_blank"
              className="mx-1 cursor-pointer underline hover:no-underline wider text-orange-700"
            >
              политикой конфиденциальности{" "}
            </Link>
            и{" "}
            <Link
              href="https://yasha64.ru/privacy-policy"
              target="_blank"
              className="mx-1 cursor-pointer underline hover:no-underline wider text-orange-700"
            >
              условиями
            </Link>
          </p>

          {processing && (
            <div className="text-center">
              <Spinner showText={false} />
            </div>
          )}

          <div className="mt-16 text-[14px] lg:text-[14px] font-medium text-center">
            У вас уже есть аккаунт ?
            <Link
              href="/auth/signin"
              className="text-orange-500 text-[14px] ml-2 underline hover:no-underline focus:outline-none"
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
