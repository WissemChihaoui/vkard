import useSWR from "swr";
import { endpoints, fetcher } from "../utils/axios";
import { useMemo } from "react";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetProducts() {
  const url = endpoints.products.getAll;

  const { data } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      products: data || [],
    }),
    [data]
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
