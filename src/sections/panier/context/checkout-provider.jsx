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
  // const router = useRouter();

  const searchParams = useSearchParams();

  const activeStep = Number(searchParams.get("step"));

  const { state, setState, setField, canReset } = useLocalStorage(
    STORAGE_KEY,
    initialState
  );
  const tvaRate = 0.2;

  const updateTotalField = useCallback(() => {
    const totalItems = state.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const subtotal = state.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const tva = subtotal * tvaRate;
    const total = subtotal + tva - state.discount + state.shipping;

    setField("subtotal", subtotal);
    setField("totalItems", totalItems);
    setField("tva", tva); // ← Add this line
    setField("total", total); // ← Update total to include TVA
  }, [setField, state.discount, state.items, state.shipping]);
  
  useEffect(() => {
    const restoredValue = getStorage(STORAGE_KEY);
    if (restoredValue) {
      updateTotalField();
    }
  }, [updateTotalField]);

  const onAddToCart = useCallback(
    (newItem) => {
      const updatedItems = state.items.map((item) => {
        return item;
      });

      if (!updatedItems.some((item) => item.id === newItem.id)) {
        updatedItems.push(newItem);
      }

      setField("items", updatedItems);
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

  const onSelectLivraison = useCallback((method) => {
  let shipping = 0;
  if (method === "xpress") shipping = 13.8;

  setField("livraison", method);
  setField("shipping", shipping);
}, [setField]);

  const onIncreaseQuantity = useCallback(
    (itemId) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setField("items", updatedItems);
    },
    [setField, state.items]
  );

  const onDecreaseQuantity = useCallback(
    (itemId) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

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

  const submitOrder = useCallback(async (formData) => {
    try {
      const res = await submitOrderHandler(formData, state );
       if (res?.stripe_url) {
            setState([])
            window.location.href = res.stripe_url;
          } else {
            toast.error("Erreur lors de la création de la session Stripe.");
          }

    }catch (error) {
      console.error(error);
    }
  }, [state, setState])



  const memoizedValue = useMemo(
    () => ({
      ...state,
      canReset,
      onUpdate: setState,
      onUpdateField: setField,
      //
      //
      onAddToCart,
      onDeleteCart,
      //
      onIncreaseQuantity,
      onDecreaseQuantity,
      //
      onCreateBilling,
      onApplyDiscount,
      onApplyShipping,
      //
      activeStep,

      submitOrder,
onSelectLivraison,
    }),
    [
      state,
      canReset,
      setField,
      setState,
      activeStep,
      onAddToCart,
      onDeleteCart,
      onApplyDiscount,
      onApplyShipping,
      onCreateBilling,
      onDecreaseQuantity,
      onIncreaseQuantity,
      submitOrder,
      onSelectLivraison
    ]
  );

  return (
    <CheckoutContext.Provider value={memoizedValue}>
      {children}
    </CheckoutContext.Provider>
  );
}

// ----------------------------------------------------------------------
