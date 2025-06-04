import React, { useEffect, useState } from "react";
import Input from "../../../components/input/input";

export default function EditAddModal({ open, onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [hasImage, setHasImage] = useState(true); // New state
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price || "");
      setHasImage(initialData.has_image ?? true); // populate has_image
      if (initialData.image) setPreview(initialData.image);
    } else {
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      setPreview(null);
      setHasImage(true);
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", price);
    data.append("has_image", hasImage ? "1" : "0"); // Include new field
    if (image) data.append("image", image);
    if (initialData?.id) data.append("id", initialData.id);
    onSubmit(data);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-n-7 p-6 rounded-lg shadow-xl w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-white">
          {initialData ? "Modifier la carte" : "Ajouter une carte"}
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-300">Titre</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="border-b">
              <label className="block mb-1 text-sm  text-gray-300">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-2 w-full py-1 rounded-t-lg border-0 outline-none bg-transparent"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Prix</label>
              <Input
                type="number"
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* New checkbox field */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasImage"
                checked={hasImage}
                onChange={() => setHasImage(!hasImage)}
                className="accent-blue-600"
              />
              <label htmlFor="hasImage" className="text-sm text-gray-300">
                Cette carte doit-elle contenir une image ou logo ?
              </label>
            </div>
          </div>

          {/* Image Picker Section */}
          <div className="flex-1">
            <label className="block mb-1 text-sm  text-gray-300">Image</label>
            <div className="relative border border-dashed border-gray-300 rounded-md overflow-hidden group cursor-pointer h-80">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Aucune image
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm">Changer l’image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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
            {initialData ? "Enregistrer les modifications" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}
