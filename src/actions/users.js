import useSWR, { mutate } from "swr";
import axios, { deleter, endpoints, fetcher, poster, putter } from "../utils/axios";
import { useMemo } from "react";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// GET CURRENT USER AUTHENTICATED
export function useGetUser() {
  const url = endpoints.auth.me;

  const { data } = useSWR(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      userData: data || [],
    }),
    [data]
  );

  return memoizedValue;
}

// UPDATE CURRENT USER DATA
export const updateMe = async (data) => {
  try {
    const res = await putter(endpoints.users.updateMe, data);

    mutate(endpoints.auth.me);

    return res;
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du profil:", error);
    // toast.error("Une erreur est survenue lors de la mise à jour.");
    throw error;
  }
};

// CHANGE CURRENT USER PASSWORD
export const changePassword = async (data) => {
  try {
    const res = await putter(endpoints.users.changePassword, data);
    return res.data;
  } catch (error) {
    console.error("❌ Error during password change:", error);
    throw error;
  }
};

export function useGetUsers() {
  const url = endpoints.users.all;

  const { data } = useSWR(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      usersData: data ?? [],
    }),
    [data]
  );

  return memoizedValue;
}

export function useGetClient(id) {
  const url = endpoints.users.get(id);

  const { data } = useSWR(url, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      userData: data ?? {},
    }),
    [data]
  );

  return memoizedValue;
}

export const deleteUser = async (id) => {
  try {
    const res = await deleter(endpoints.users.delete(id));

    mutate(endpoints.users.all);
    return res;
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du profil:", error);
    throw error;
  }
};

export const sendMessage = async (data) => {
  const url = endpoints.users.sendMessage;

  console.log(data);

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const url = endpoints.users.create;

    const params = {...data};

    const res = await poster(url, params)

    mutate(endpoints.users.all)

    return res;

  } catch (error) {
    console.error("❌ Erreur lors de la création d'un client:", error);
    throw error;
  }
}
