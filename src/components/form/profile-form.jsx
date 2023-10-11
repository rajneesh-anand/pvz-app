import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useModalAction } from "@components/modal/modal.context";
import CloseButton from "@components/ui/close-button";
import cn from "classnames";
import { useSession, signOut } from "next-auth/react";
import CameraIcon from "@assets/icons/camera-icon";
import Dropzone from "react-dropzone";
import Container from "@components/ui/container";
import { useHookFormMask } from "use-mask-input";
import Link from "@components/ui/link";
import PhoneInput from "@components/ui/form/phone-input";
import InputIcon from "@components/ui/form/input-icon";
import Spinner from "@components/ui/spinner";
import Alert from "@components/ui/alert";

function maskMobileNumber(number) {
  return (
    "+7" +
    " " +
    number.slice(0, 3) +
    " " +
    number.slice(3, 6) +
    "-" +
    number.slice(6, 10)
  );
}

const ProfileForm = () => {
  const [processing, setProcessing] = useState(false);
  const { data: session, status } = useSession();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  const registerWithMask = useHookFormMask(register);

  useEffect(() => {
    if (session) {
      setValue("name", session?.user?.name);
      setValue("mobile", maskMobileNumber(session?.user?.mobile));
      setValue("email", session?.user?.email);
    }
  }, [session]);

  async function onSubmit({ name, mobile }) {
    setProcessing(true);
    const formData = new FormData();
    formData.append("image", profileImage);
    formData.append("userName", name);
    formData.append("userMobile", session?.user?.mobile);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/user/profile/update`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setProcessing(false);
        setMessage("success");
        setError("Информация в профиле обновлена!");
      }
    } catch (error) {
      setProcessing(false);
      setMessage("error");
      setError(error.message);
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="overflow-hidden bg-orange-300/10  flex items-center justify-center w-full h-14 border-b border-orange-700/10 ">
        <p className=" font-semibold text-orange-700 text-lg">Мой профайл</p>
      </div>
      <Container>
        <div className="flex flex-col items-center h-screen">
          <img
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : session?.user?.image
            }
            alt={session?.user?.name}
            className="w-24 h-24 p-1 rounded-full ring-2 ring-gray-300 mt-4"
          />
          <Dropzone
            onDrop={(acceptedFiles) => setProfileImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="w-full my-4">
                <div
                  {...getRootProps({
                    className:
                      " border-dashed border-4 border-orange-500 p-2 rounded flex items-center justify-center cursor-pointer focus:border-accent-400 focus:outline-none",
                  })}
                >
                  <input {...getInputProps()} />
                  <CameraIcon color="#7f7777" />
                  <p className="ml-2 font-semibold text-lg ">
                    Измените фотографию профиля
                  </p>
                </div>
              </section>
            )}
          </Dropzone>

          {error && (
            <Alert
              message={error}
              variant={message}
              closeable={true}
              className="my-4 w-full"
              onClose={() => setError(null)}
            />
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-4"
            noValidate
          >
            <InputIcon
              label="Полное имя"
              labelClassName="text-orange-500"
              iconClass="icon_profile text-orange-500"
              variant="outline"
              className="mb-4"
              //   placeholder="Введите свое полное имя"
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
              labelClassName="text-orange-500"
              iconClass="icon_mobile text-orange-500"
              variant="outline"
              className="mb-4"
              readOnly={true}
              //   placeholder="Введите номер мобильного телефона"
              error={errors.mobile?.message}
            />

            <InputIcon
              label="Электронная почта"
              labelClassName="text-orange-500"
              iconClass="icon_mail text-orange-500"
              variant="outline"
              className="mb-4"
              readOnly={true}
              //   placeholder="Введите адрес электронной почты "
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

            <div className="relative">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full  px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange-500/90 rounded-sm shadow-sm focus:outline-none hover:bg-opacity-90"
              >
                {processing ? "Сохранение... " : "Обновить информацию"}
              </button>
            </div>
          </form>
          {processing && (
            <div className="text-center">
              <Spinner showText={false} />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProfileForm;
