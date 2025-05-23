import { ToastContainer } from "react-toastify";
import "./App.css";
import { Router } from "./routes/sections";
import { CheckoutProvider } from "./sections/panier/context/checkout-provider";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./auth/context/jwt";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
function App() {
  useScrollToTop();
  return (
    <CheckoutProvider>
      <AuthProvider>
        <Router />
        <ToastContainer />
      </AuthProvider>
    </CheckoutProvider>
  );
}

export default App;
