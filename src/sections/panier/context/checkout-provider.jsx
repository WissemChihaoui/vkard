import {
  useMemo,
  Suspense,
  useEffect,
  useCallback,
  createContext,
} from "react";

// import { paths } from '../../../routes/paths';
import { useSearchParams } from "../../../routes/hooks";

import { getStorage, useLocalStorage } from "../../../hooks/use-local-storage";
import { submitOrderHandler } from "../../../actions/orders";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export const CheckoutContext = createContext(undefined);

export const CheckoutConsumer = CheckoutContext.Consumer;

const STORAGE_KEY = "vkard-cart";

const initialState = {
  items: [],
  subtotal: 0,
  tva: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: null,
  totalItems: 0,
  livraison: 'poste',
};

// ----------------------------------------------------------------------

export function CheckoutProvider({ children }) {
  return <Container>{children}</Container>;
}

// ----------------------------------------------------------------------

function Container({ children }) {
  const searchParams = useSearchParams();
  const activeStep = Number(searchParams.get("step"));

  const { state, setState, setField, canReset } = useLocalStorage(
    STORAGE_KEY,
    initialState
  );

  const TVA_RATE = 0.14975;

  // // Derived values
  // const subtotal = state.total / (1 + TVA_RATE);
  // const tva = state.total - subtotal;

  const updateTotalField = useCallback(() => {
  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const HT = state.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const TVA = HT * TVA_RATE;

  const TTC = HT * (1 + TVA_RATE) + state.shipping;

  setField("totalItems", totalItems);
  setField("total", TTC); // Store TTC
  setField("subtotal", HT); // Optional: if you want to persist
  setField("tva", TVA);     // Optional: if you want to persist
}, [setField, state.items, state.shipping]);

  useEffect(() => {
    const restoredValue = getStorage(STORAGE_KEY);
    if (restoredValue) {
      updateTotalField();
    }
  }, [updateTotalField]);

  const onAddToCart = useCallback(
    (newItem) => {
      try {
        if (!newItem || !newItem.id) {
          toast.error("Échec de l'ajout de l'article.");
          return;
        }

        const updatedItems = [...state.items];

        if (updatedItems.some((item) => item.id === newItem.id)) {
          toast.warning("Cet article est déjà dans le panier.");
          return;
        }

        updatedItems.push(newItem);
        setField("items", updatedItems);
        toast.success("Article ajouté au panier !");
      } catch (error) {
        console.error(error);
        toast.error("Une erreur s'est produite lors de l'ajout.");
      }
    },
    [setField, state.items]
  );

  const onDeleteCart = useCallback(
    (itemId) => {
      const updatedItems = state.items.filter((item) => item.id !== itemId);
      setField("items", updatedItems);
    },
    [setField, state.items]
  );

  const onSelectLivraison = useCallback(
    (method) => {
      let shipping = 0;
      if (method === "xpress") shipping = 13.8;

      setField("livraison", method);
      setField("shipping", shipping);
    },
    [setField]
  );

  const onIncreaseQuantity = useCallback(
    (itemId) => {
      const updatedItems = state.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setField("items", updatedItems);
    },
    [setField, state.items]
  );

  const onDecreaseQuantity = useCallback(
    (itemId) => {
      const updatedItems = state.items.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setField("items", updatedItems);
    },
    [setField, state.items]
  );

  const onCreateBilling = useCallback(
    (address) => {
      setField("billing", address);
    },
    [setField]
  );

  const onApplyDiscount = useCallback(
    (discount) => {
      setField("discount", discount);
    },
    [setField]
  );

  const onApplyShipping = useCallback(
    (shipping) => {
      setField("shipping", shipping);
    },
    [setField]
  );

  const submitOrder = useCallback(
    async (formData) => {
      try {
        const res = await submitOrderHandler(formData, state);
        if (res?.stripe_url) {
          setState([]); // clear local storage
          window.location.href = res.stripe_url;
        } else {
          toast.error("Erreur lors de la création de la session Stripe.");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [state, setState]
  );
console.log(state)
  const memoizedValue = useMemo(
    () => ({
      ...state,
      // subtotal, // dynamically computed
      // tva,      // dynamically computed
      canReset,
      onUpdate: setState,
      onUpdateField: setField,
      //
      onAddToCart,
      onDeleteCart,
      onIncreaseQuantity,
      onDecreaseQuantity,
      onCreateBilling,
      onApplyDiscount,
      onApplyShipping,
      onSelectLivraison,
      submitOrder,
      activeStep,
    }),
    [
      state,
      // subtotal,
      // tva,
      canReset,
      setField,
      setState,
      activeStep,
      onAddToCart,
      onDeleteCart,
      onIncreaseQuantity,
      onDecreaseQuantity,
      onCreateBilling,
      onApplyDiscount,
      onApplyShipping,
      onSelectLivraison,
      submitOrder,
    ]
  );

  return (
    <CheckoutContext.Provider value={memoizedValue}>
      {children}
    </CheckoutContext.Provider>
  );
}


// ----------------------------------------------------------------------
