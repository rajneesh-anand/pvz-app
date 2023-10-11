import Link from "@components/ui/link";
import dayjs from "dayjs";
import EditIcon from "@assets/icons/edit-icon";
import Container from "@components/ui/container";

const GiftList = ({ data }) => {
  return (
    <>
      <div className=" bg-orange-300/10 fixed z-30 top-0 flex items-center justify-center w-full h-14 border-b border-orange-700/10 ">
        <p className="font-semibold text-orange-700 text-lg">Мои продукты</p>
      </div>
      <Container className="mt-16">
        {data.length > 0 ? (
          <div className="flex flex-col">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="rounded-md border border-orange-700 p-4 mb-4 bg-indigo-200/10"
                >
                  <small className="bg-yellow-100 text-yellow-800 text-xs font-medium  px-3 py-0.5 rounded-full">
                    {item.redeemStatus}
                  </small>
                  <h3>{item.product}</h3>
                  <div className="bg-indigo-900 text-white text-lg font-bold px-3 py-1 rounded-sm w-1/2">
                    Код : {item.redeemCode}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <img src="/nogifts.webp" alt="no gifts" />
          </div>
        )}
      </Container>
    </>
  );
};

export default GiftList;
