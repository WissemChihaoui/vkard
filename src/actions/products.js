import useSWR, { mutate } from "swr";
import axios, { deleter, endpoints, fetcher, poster } from "../utils/axios";
import { useMemo } from "react";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetProducts() {
  const url = endpoints.products.getAll;

  const { data, isLoading } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      products: data || [],
      productsLoading : isLoading,
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function useGetProduct(id) {
  const url = endpoints.products.get(id);

  const { data } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      product: data || {},
    }),
    [data]
  );

  return memoizedValue;
}

export const deleteProduct = async (id) => {
  const url = endpoints.products.delete(id);

  const res = await deleter(url);

  mutate(endpoints.products.getAll)

  return res.data;
};

export const createProduct= async (data) => {
  const url = endpoints.products.add

  const res = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
      },
});
  mutate(endpoints.products.getAll)
  return res.data
}
export const updateProduct = async (id, data) => {
  const url = endpoints.products.edit(id);


  // Debug the form data
  for (let [key, value] of data.entries()) {
    console.log(`${key}: ${value}`);
  }

  const res = await axios.post(url, data, {
    headers: {
      Accept: "application/json",
    },
  });

  mutate(endpoints.products.getAll);

  return res.data;
};
