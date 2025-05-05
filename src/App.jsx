import './App.css'
import { Router } from './routes/sections'
import { CheckoutProvider } from './sections/panier/context/checkout-provider'

function App() {

  return (
    <CheckoutProvider>
      <Router />
    </CheckoutProvider>
  )

}

export default App
