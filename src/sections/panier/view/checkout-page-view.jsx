import React, { useState } from "react";
import Section from "../../../components/section/Section";
import Heading from "../../../components/heading/heading";
import Input from "../../../components/input/input";
import Button from "../../../components/button/Button";
import { useCheckoutContext } from "../context";
import CheckoutButton from "../../../components/checkoutButton";

export default function CheckoutPageView() {
  const { subtotal, tva, total, onCreateBilling } = useCheckoutContext();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    streetNumber: "",
    apartment: "",
    zip: "",
    city: "",
    phone: "",
    shipToDifferent: false,
    payment: "card", // default selected
    cardNumber: "",
    cardExpiry: "",
    cardCcv: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateBilling(formData);
  };

  return (
    <Section className="xl:py-6 lg:py-4">
      <div className="container">

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Billing Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-n-1/5 p-6 rounded-xl flex flex-col gap-4 h-min"
          >
              <h4 className="text-xl font-bold mb-4">Détails de facturation</h4>
            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="firstName"
                placeholder="Prénom *"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                name="lastName"
                placeholder="Nom *"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <Input
              name="company"
              placeholder="Nom de l’entreprise (facultatif)"
              value={formData.company}
              onChange={handleChange}
            />
            <Input
              name="country"
              placeholder="Pays/région *"
              required
              value={formData.country}
              onChange={handleChange}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="streetNumber"
                placeholder="Numéro et nom de rue *"
                required
                value={formData.streetNumber}
                onChange={handleChange}
              />
              <Input
                name="apartment"
                placeholder="Bâtiment, appartement (facultatif)"
                value={formData.apartment}
                onChange={handleChange}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="zip"
                placeholder="Code postal *"
                required
                value={formData.zip}
                onChange={handleChange}
              />
              <Input
                name="city"
                placeholder="Ville *"
                required
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <Input
              name="phone"
              placeholder="Téléphone *"
              required
              value={formData.phone}
              onChange={handleChange}
            />

            <label className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                name="shipToDifferent"
                checked={formData.shipToDifferent}
                onChange={handleChange}
                className="w-5 h-5 accent-primary rounded border border-gray-300"
              />
              <span className="text-sm font-medium">
                Expédier à une adresse différente ?
              </span>
            </label>

           
          </form>

          {/* Right - Summary + Payment */}
          <div className="bg-n-1/5 border border-n-1/10 p-6 rounded-xl h-fit space-y-6">
            <div>
              <h4 className="text-xl font-bold mb-4">Résumé de la commande</h4>
              <div className="flex justify-between mb-2">
                <span>Total HT :</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>TVA (20%) :</span>
                <span>{tva.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-4 mt-4">
                <span>Total TTC :</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Méthode de paiement</h4>
              <div className="grid gap-3">
                {[
                  { label: "Carte bancaire", value: "card" },
                  { label: "Google Pay", value: "gpay" },
                  { label: "PayPal", value: "paypal" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition ${
                      formData.payment === option.value
                        ? "border-blue-500 bg-blue-50 text-blue-500"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.value}
                      checked={formData.payment === option.value}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>

              {formData.payment === "card" && (
                <div className="mt-4 space-y-3">
                  <Input
                    name="cardNumber"
                    placeholder="Numéro de carte"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="cardExpiry"
                    placeholder="Date d’expiration (MM/AA)"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="cardCcv"
                    placeholder="CVC"
                    value={formData.cardCcv}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>
            <Button type="submit" className="mt-4 w-full">
              Valider la commande
            </Button>
            <CheckoutButton 
            cartItems={[
              { name: 'Carte VKARD', price: 5400, quantity: 1 }, // price in cents!
              { name: 'Carte VKARD Bois', price: 5400, quantity: 1 },
            ]}/>
          </div>
        </div>
      </div>
    </Section>
  );
}
