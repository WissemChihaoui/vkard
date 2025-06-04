import useSWR, { mutate } from "swr";
import axios, { deleter, endpoints, fetcher, putter } from "../utils/axios";
import { useMemo } from "react";
// import axios from "axios";

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetCards() {
  const url = endpoints.cards.getMine;

  const { data } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      cards: data?.data || [],
    }),
    [data]
  );
  return memoizedValue;
}

export const submitCardData = async (data) => {
  const url = endpoints.cards.submit;
  const formData = new FormData();

  const parseJSON = (value, fallback = {}) => {
    try {
      return typeof value === "string" ? JSON.parse(value) : value || fallback;
    } catch {
      return fallback;
    }
  };
  formData.append("_method", "put");
  formData.append("id", data.id);
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("company", data.company || "");
  formData.append("description", data.description || "");

  if (data.contact) {
    formData.append("contact", JSON.stringify(parseJSON(data.contact)));
  }

  if (data.socials) {
    formData.append("socials", JSON.stringify(parseJSON(data.socials)));
  }

  if (data.links) {
    const filteredLinks = parseJSON(data.links, []).filter(
      (link) => link.title && link.url
    );
    formData.append("links", JSON.stringify(filteredLinks));
  }

  if (data.picture instanceof File) {
    formData.append("picture", data.picture);
  }

  try {
    const res = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
      },
    });
 mutate(endpoints.cards.getMine)
    return res.data;
  } catch (error) {
    console.error(
      "❌ Error while submitting card data:",
      error.response?.data || error
    );
    throw error;

  }
};

export function useGetAllCards() {
  const url = endpoints.cards.all;

  const { data } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      cards: data?.data || [],
    }),
    [data]
  );

  return memoizedValue;
}

export const deleteCard = async (id) => {
  try {
    const res = await deleter(endpoints.cards.delete(id));

    mutate(endpoints.cards.all);
    return res;
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du profil:", error);
    throw error;
  }
};

export const changeCardStatus = async (id, status) => {
  try {
    const res = await putter(endpoints.cards.changeStatus(id), { status });

    mutate(endpoints.cards.all);
    // mutate(endpoints.cards.)

    return res;

  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du profil:", error);
    throw error;
  }
};


export function useGetProfile(id) {
   const url = endpoints.cards.profile(id);

  const { data } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      profile: data?.profile || {},
    }),
    [data]
  );

  return memoizedValue;
}