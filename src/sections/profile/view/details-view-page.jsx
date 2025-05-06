import React, { useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/input";

export default function DetailsViewPage() {
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

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-xl font-semibold">Détails du compte</h2>
        <Button onClick={() => alert("Fonction d'enregistrement ici.")}>
          Enregistrer
        </Button>
      </div>

      {/* Profile Info Form */}
      <form className="border p-6 rounded-xl flex flex-col gap-4 shadow">
        <Input
          name="email"
          type="email"
          placeholder="E-mail *"
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
      </form>

      {/* Password Update Section */}
      <div className="border p-6 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Changer le mot de passe</h3>
        <Input
          name="oldPassword"
          type="password"
          placeholder="Mot de passe actuel *"
          value={passwordData.oldPassword}
          onChange={handlePasswordChange}
        />
        <Input
          name="newPassword"
          type="password"
          placeholder="Nouveau mot de passe *"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmer le mot de passe *"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
        />
        <Button onClick={() => alert("Mise à jour du mot de passe")}>
          Modifier le mot de passe
        </Button>
      </div>
    </div>
  );
}
