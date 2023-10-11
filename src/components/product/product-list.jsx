import Link from "@components/ui/link";
import EditIcon from "@assets/icons/edit-icon";
import { useRouter } from "next/router";
import ErrorMessage from "@components/common/error";
import Spinner from "@components/ui/spinner";
import { useProductsQuery } from "@framework/product-query";
import { useUserInfo } from "@contexts/user.context";

const ProductList = () => {
  const router = useRouter();
  const { balancedCoins } = useUserInfo();
  console.log(balancedCoins);

  const {
    data,
    isLoading: loading,
    error,
  } = useProductsQuery({
    limit: 12,
    page: 1,
    ...router,
  });

  if (loading) return <Spinner showText={true} />;
  if (error) return <ErrorMessage message={error.message} />;
  const { products } = data.products ?? {};
  // console.log(products);

  return (
    <>
      {products.length > 0 ? (
        <div className="flex flex-col pt-4 pb-8 px-4">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row items-start text-left  mb-3"
            >
              <div className="mr-4 h-32 w-32 flex-none">
                <img
                  src={item.image ?? "/images/placeholder/product.svg"}
                  alt={item.name}
                  quality={100}
                  className="h-32 rounded-lg object-contain w-32 "
                />
              </div>
              <div className="w-full">
                <Link
                  href={`/product/${item.slug}`}
                  className="font-semibold text-indigo-900 text-[14px]"
                >
                  {item.name}
                </Link>

                {item.inStock > 0 ? (
                  <div className="flex items-center justify-between py-2">
                    <div className="inline-flex items-center">
                      <img
                        src="/images/misc/coin.svg"
                        alt="coin"
                        className="w-8 h-8 "
                      />
                      <p className="text-orange-900 ml-1 font-semibold text-[20px]">
                        {item.coinValue}
                      </p>
                    </div>
                    <Link href={`/product/${item.slug}`}>
                      {item.coinValue > balancedCoins ? (
                        <i className="icon_lock text-orange-700 text-[20px]"></i>
                      ) : (
                        <i className="icon_lock-open text-teal-700 text-[20px]"></i>
                      )}
                    </Link>
                  </div>
                ) : (
                  <p>out of stock</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="bg-rose-700 font-semibold  py-2 px-8 text-white">
            No Products
          </p>
        </div>
      )}
    </>
  );
};

export default ProductList;
