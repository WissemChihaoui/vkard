import { toast } from "react-toastify";
import { STORAGE_KEY } from "../constants";
import axios, { endpoints } from "../utils/axios";

export const submitOrderHandler = async (formData, order) => {
  try {

    const params = { user: { ...formData }, order };
    const res = await axios.post(endpoints.orders.submit, params, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(STORAGE_KEY)}`,
      },
    });

    const responseData = res.data;

    // Handle response messages
    if (responseData?.case === "account_connected") {
      toast.info("Account updated and the order has been saved.");
    } else if (responseData?.case === "account_disconnected") {
      toast.error("Email utilisé, veuillez vous connecter ou en choisir un autre.");
      return; // Stop execution to avoid redirect
    } else if (responseData?.case === "new_account") {
      toast.info("Votre compte a été créé et la commande est enregistrée.");
    }

    return responseData
  } catch (error) {
    console.error("❌ Error during order creation:", error);
    toast.error("Une erreur est survenue. Veuillez réessayer.");
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const url = endpoints.orders.getMine;
    const res = await axios.get(url , {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(STORAGE_KEY)}`,
      },
    });
    return res
  } catch (error) {
    console.error("❌ Error during order creation:", error);
    toast.error("Une erreur est survenue. Veuillez réessayer.");
  }
}