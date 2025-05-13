import React, { useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/input";
import { useAuthContext } from "../../../auth/hooks";
import { changePassword, updateMe } from "../../../actions/users";
import { toast } from "react-toastify";

export default function DetailsViewPage() {
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    company: user?.company || '',
    country: user?.country || '',
    streetNumber: user?.street_number || '',
    apartment: user?.apartment || '',
    zip: user?.zip || '',
    city: user?.city || '',
    phone: user?.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await toast.promise(
      updateMe(formData),
      {
        pending: 'Mise à jour en cours...',
        success: 'Profil mis à jour avec succès !',
        error: "Une erreur s'est produite lors de la mise à jour.",
      }
    );
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      toast.error("Confirmer votre mot de passe");
      return;
    }

    try {
      await toast.promise(
        changePassword(passwordData),
        {
          pending: 'Mise à jour du mot de passe...',
          success: 'Mot de passe modifié avec succès !',
          error: "Échec de la mise à jour du mot de passe.",
        }
      );

      // ✅ Reset password fields if success
      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" mx-auto space-y-10">
      <form className="border p-6 rounded-xl flex flex-col gap-4 shadow" onSubmit={onSubmit}>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h2 className="text-xl font-semibold">Détails du compte</h2>
          <Button type="submit">Enregistrer</Button>
        </div>

        <Input name="email" type="email" placeholder="E-mail *" required value={formData.email} onChange={handleChange} />
        <div className="grid md:grid-cols-2 gap-4">
          <Input name="firstName" placeholder="Prénom *" required value={formData.firstName} onChange={handleChange} />
          <Input name="lastName" placeholder="Nom *" required value={formData.lastName} onChange={handleChange} />
        </div>
        <Input name="company" placeholder="Nom de l’entreprise (facultatif)" value={formData.company} onChange={handleChange} />
        <Input name="country" placeholder="Pays/région *" required value={formData.country} onChange={handleChange} />
        <div className="grid md:grid-cols-2 gap-4">
          <Input name="streetNumber" placeholder="Numéro et nom de rue *" required value={formData.streetNumber} onChange={handleChange} />
          <Input name="apartment" placeholder="Bâtiment, appartement (facultatif)" value={formData.apartment} onChange={handleChange} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Input name="zip" placeholder="Code postal *" required value={formData.zip} onChange={handleChange} />
          <Input name="city" placeholder="Ville *" required value={formData.city} onChange={handleChange} />
        </div>
        <Input name="phone" placeholder="Téléphone *" required value={formData.phone} onChange={handleChange} />
      </form>

      <form onSubmit={handlePasswordSubmit} className="border p-6 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Changer le mot de passe</h3>
        <Input
          name="current_password"
          type="password"
          placeholder="Mot de passe actuel *"
          value={passwordData.current_password}
          onChange={handlePasswordChange}
        />
        <Input
          name="new_password"
          type="password"
          placeholder="Nouveau mot de passe *"
          value={passwordData.new_password}
          onChange={handlePasswordChange}
        />
        <Input
          name="new_password_confirmation"
          type="password"
          placeholder="Confirmer le mot de passe *"
          value={passwordData.new_password_confirmation}
          onChange={handlePasswordChange}
        />
        <Button type="submit">Modifier le mot de passe</Button>
      </form>
    </div>
  );
}
