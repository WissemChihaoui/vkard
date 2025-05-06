import React from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/input";

export default function RegisterSection() {
  return (
    <form className="space-y-6">
      <h3 className="text-xl font-semibold">S’enregistrer</h3>
      <div>
        <Input name="email" required type="email" placeholder="Email" />
      </div>
      <p className="text-sm text-gray-600">
        Un lien permettant de définir un nouveau mot de passe sera envoyé à
        votre adresse e-mail.
      </p>
      <p className="text-sm text-gray-600">
        Vos données personnelles seront utilisées pour vous accompagner au cours
        de votre visite du site web, gérer l’accès à votre compte, et pour
        d’autres raisons décrites dans notre Politique de confidentialité.
      </p>
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="updates" className="w-4 h-4" />
        <label htmlFor="updates" className="text-sm">
          Je veux recevoir des mises à jour sur les produits et les promotions.
        </label>
      </div>
      <Button type="submit">S'enregistrer</Button>
    </form>
  );
}
