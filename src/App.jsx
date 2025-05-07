import { ToastContainer } from 'react-toastify'
import './App.css'
import { Router } from './routes/sections'
import { CheckoutProvider } from './sections/panier/context/checkout-provider'
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <CheckoutProvider>
      <Router />
      <ToastContainer />
    </CheckoutProvider>
  )

}

export default App
