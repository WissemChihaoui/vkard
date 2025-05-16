import React, { useEffect, useState } from "react";
import Section from "../../../components/section/Section";
import Input from "../../../components/input/input";
import Button from "../../../components/button/Button";
import { useCheckoutContext } from "../context";
import CheckoutButton from "../../../components/checkoutButton";
import { useAuthContext } from "../../../auth/hooks";
import LoginSection from "../login-section";
import { signInWithPassword } from "../../../actions/auth";
import { toast } from "react-toastify";

export default function CheckoutPageView() {
  const { subtotal, shipping, tva, total, submitOrder, livraison, onSelectLivraison } =
    useCheckoutContext();

  const { user, checkUserSession } = useAuthContext();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

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
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        company: user.company || "",
        country: user.country || "",
        streetNumber: user.street_number || "",
        apartment: user.apartment || "",
        zip: user.zip || "",
        city: user.city || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const promise = signInWithPassword(loginData);

    toast.promise(promise, {
      pending: "Connexion en cours...",
      success: "Connecté avec succès !",
      error: "Échec de la connexion. Vérifiez vos identifiants.",
    });

    try {
      await promise;
      checkUserSession?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    await submitOrder(formData);
  };

  return (
    <Section className="xl:py-6 lg:py-4">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Billing Form */}
          <div className="lg:col-span-2">
            <LoginSection
              user={user}
              handleLoginSubmit={handleLoginSubmit}
              setLoginData={setLoginData}
              loginData={loginData}
            />
            <form
              onSubmit={handleCheckout}
              className="bg-n-1/5 p-6 rounded-xl flex flex-col gap-4 h-min"
            >
              <h4 className="text-xl font-bold mb-4">Détails de facturation</h4>
              <Input
                readOnly={user?.email}
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
              <Button type="submit" className="mt-4 w-full">
                Valider la commande
              </Button>
            </form>
          </div>

          {/* Right - Summary + Payment */}
          <div className="space-y-6">
            <div className="bg-n-1/5 border border-n-1/10 p-6 rounded-xl h-fit ">
              <div>
                <h4 className="text-xl font-bold mb-4">
                  Résumé de la commande
                </h4>
                <div className="flex justify-between mb-2">
                  <span>Total HT :</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>TVA (20%) :</span>
                  <span>{tva.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Frais de livraison :</span>
                  <span>{shipping.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-4 mt-4">
                  <span>Total TTC :</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
            <div className="bg-n-1/5 border border-n-1/10 p-6 rounded-xl h-fit space-y-6">
              <div>
                <h4 className="text-xl font-bold mb-4">Livraison</h4>
                <div className="space-y-2 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="livraison"
                      value="poste"
                      checked={livraison === "poste"}
                      onChange={() => onSelectLivraison("poste")}
                    />
                    <span>Poste-lettre : gratuite</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="livraison"
                      value="xpress"
                      checked={livraison === "xpress"}
                      onChange={() => onSelectLivraison("xpress")}
                    />
                    <span>Xpresspost : 13.80 €</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
