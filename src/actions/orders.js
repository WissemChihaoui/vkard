import { toast } from "react-toastify";
import { STORAGE_KEY } from "../constants";
import axios, { endpoints } from "../utils/axios";
// import { CONFIG } from "src/config-global";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(CONFIG.stripePublicKey);

export const submitOrderHandler = async (formData, order) => {
  try {
    // const stripe = await stripePromise;

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

    // Redirect to Stripe Checkout
    if (responseData?.stripe_url) {
      window.location.href = responseData.stripe_url;
    } else {
      toast.error("Erreur lors de la création de la session Stripe.");
    }
  } catch (error) {
    console.error("❌ Error during order creation:", error);
    toast.error("Une erreur est survenue. Veuillez réessayer.");
    throw error;
  }
};
