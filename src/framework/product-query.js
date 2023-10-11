import http from "@framework/http";
import { useQuery } from "react-query";
import { mapPaginatorData } from "@framework/data-mapper";

const fetchProducts = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const { page, limit } = _params;

  const {
    data: { products, ...rest },
  } = await http.get(`/item/product-list?limit=${limit}&page=${page}`);

  // console.log(products);
  return {
    products: { products, paginatorInfo: mapPaginatorData({ ...rest }) },
  };
};

const useProductsQuery = (params, options = {}) => {
  return useQuery([, params], fetchProducts, {
    ...options,
    keepPreviousData: true,
  });
};

export { useProductsQuery };
