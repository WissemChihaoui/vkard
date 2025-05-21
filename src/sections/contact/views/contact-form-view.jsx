import React, { useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../components/input/input";
import Button from "../../../components/button/Button";
import { sendMessage } from "../../../actions/users";

export default function ContactFormView() {
  const [formData, setFormData] = useState({
    full_name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Nom Prénom requis.";
    if (!formData.company.trim()) newErrors.company = "Entreprise requise.";
    if (!formData.phone.trim()) newErrors.phone = "Téléphone requis.";
    if (!formData.email.trim()) newErrors.email = "Email requis.";
    if (!formData.subject.trim()) newErrors.subject = "Sujet requis.";
    if (!formData.message.trim()) newErrors.message = "Message requis.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    await sendMessage(formData);
    toast.success("Message envoyé avec succès !");
    setFormData({
      full_name: "",
      company: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
    setErrors({});
  } catch (err) {
    toast.error("Échec de l'envoi du message.", err);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6 shadow rounded ">
      <h2 className="text-2xl font-bold mb-6">Contactez-nous</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nom Prénom */}
        <div>
          <label className="block font-medium mb-1">Nom Prénom</label>
          <Input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm">{errors.full_name}</p>
          )}
        </div>

        {/* Entreprise */}
        <div>
          <label className="block font-medium mb-1">Entreprise</label>
          <Input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          {errors.company && (
            <p className="text-red-500 text-sm">{errors.company}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block font-medium mb-1">Téléphone</label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Sujet */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Sujet</label>
          <Input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Message</label>
          <Input
            name="message"
            value={formData.message}
            onChange={handleChange}
            as="textarea"
            rows={5}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        {/* Button */}
        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" white>
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
}
