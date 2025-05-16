import { toast } from "react-toastify";
import { STORAGE_KEY } from "../constants";
import fetcher, { deleter, endpoints, poster } from "../utils/axios";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useMemo } from "react";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// SUBMIT ORDER
export const submitOrderHandler = async (formData, order) => {
  try {
    const params = { user: { ...formData }, order };

    const res = await poster(endpoints.orders.submit, params, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(STORAGE_KEY)}`,
      },
    });

    // Handle response messages
    if (res?.case === "account_connected") {
      toast.info("Compte mis à jour et commande enregistrée.");
    } else if (res?.case === "account_disconnected") {
      toast.error(
        "Email utilisé, veuillez vous connecter ou en choisir un autre."
      );
      return; // Stop execution to avoid redirect
    } else if (res?.case === "new_account") {
      toast.info("Votre compte a été créé et la commande est enregistrée.");
    }

    return res;
  } catch (error) {
    console.error("❌ Erreur lors de la création de la commande :", error);
    toast.error("Une erreur est survenue. Veuillez réessayer.");
    throw error;
  }
};

// GET CURRENT USER S ORDERS
export function useGetOrders() {
  const url = endpoints.orders.getMine;

  const { data } = useSWR(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      orders: data?.data || [],
    }),
    [data]
  );
  return memoizedValue;
}

export function useGetAllOrders() {
  const url = endpoints.orders.all;

  const { data } = useSWR(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      orders: data?.data || [],
    }),
    [data]
  );
  return memoizedValue;
}

export function useGetOrder(id) {
  const url = endpoints.orders.get(id);

  const { data } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      order: data|| [],
    }),
    [data]
  );
  return memoizedValue;
}

export const deleteOrder = async (id) => {
  try {
    const res = await deleter(endpoints.orders.delete(id))

    mutate(endpoints.orders.all)
    return res;

  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du profil:", error);
    throw error;
  }
}
