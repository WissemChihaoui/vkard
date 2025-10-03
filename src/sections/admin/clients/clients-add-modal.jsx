import React, { useState } from "react";
import Input from "../../../components/input/input";
import { toast } from "react-toastify";
import { createUser } from "../../../actions/users";

export default function ClientAddModal({ open, onClose }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(data);
    try {
        toast.promise(createUser(data), {
            pending: "En cours..",
            success: "Success d'ajout",
            error: "Erreur lors d'ajout"
        })

        onClose()
    } catch (error) {
        console.log(error)
    }
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-n-7 p-6 rounded-lg shadow-xl w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Ajouter un client
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <Input onChange={handleChange} type="email" name="email" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Mot de passe
            </label>
            <Input onChange={handleChange} type="password" name="password" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Nom
            </label>
            <Input onChange={handleChange} type="text" name="first_name" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Prénom
            </label>
            <Input onChange={handleChange} type="text" name="last_name" />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
