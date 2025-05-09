import React, { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/input";
import { registerAccount } from "../../actions/auth";
import { toast } from "react-toastify";

export default function RegisterSection({setIsLogin}) {

  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const promise = registerAccount({ email });
  
    toast.promise(
      promise,
      {
        pending: "Création du compte en cours...",
        success: "Compte créé ! Veuillez vérifier votre e-mail.",
        error: "Échec de la création du compte. Veuillez réessayer.",
      },
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  
    try {
      await promise;
      setIsLogin(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <h3 className="text-xl font-semibold">S’enregistrer</h3>
      <div>
        <Input name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="Email" />
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
