import React from "react";
import Input from "../../components/input/input";
import Button from "../../components/button/Button";
import Select from "../../components/select/select";
import FileInput from "../../components/file-input/file-input";

export default function VkardEditModal({
  show,
  onClose,
  data,
  setData,
  onSave,
}) {

  if (!show || !data) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [name]: value },
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...(data.links || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setData((prev) => ({ ...prev, links: newLinks }));
  };

  const handleDeleteLink = (index) => {
    const newLinks = [...(data.links || [])];
    newLinks.splice(index, 1);
    setData((prev) => ({ ...prev, links: newLinks }));
  };

  const addNewLink = () => {
    setData((prev) => ({
      ...prev,
      links: [...(prev.links || []), { title: "", url: "" }],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setData((prev) => ({ ...prev, picture: imageUrl }));
    }
  };

  return (
    <div className="mt-[0!important] fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-n-7 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <h2 className="text-xl font-semibold">Modifier la carte</h2>
          <button onClick={onClose} className="text-2xl leading-none">
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Info */}
            <div>
              <label className="text-sm font-medium text-white">Nom</label>
              <Input
                name="name"
                placeholder="Nom"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">
                Entreprise
              </label>
              <Input
                name="company"
                placeholder="Entreprise"
                value={data.company}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">
                Administrateur
              </label>
              <Input
                name="admin"
                placeholder="Administrateur"
                value={data.admin}
                onChange={handleChange}
              />
            </div>
            <div>
              <Select
                label="Type de carte"
                name="cardType"
                value={data.cardType}
                onChange={handleChange}
                options={[
                  { value: 1, label: "Standard" },
                  { value: 2, label: "Premium" },
                  { value: 3, label: "VIP" },
                ]}
              />
            </div>
            {/* Picture Upload */}
            <div className="md:col-span-2">
              <FileInput
                label="Photo"
                onChange={handleImageUpload}
                preview={data.picture}
              />
            </div>

            {/* Contact */}
            <div>
              <label className="text-sm font-medium text-white">Email</label>
              <Input
                name="email"
                placeholder="Email"
                value={data.contact?.email || ""}
                onChange={handleNestedChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">
                Téléphone
              </label>
              <Input
                name="phone"
                placeholder="Téléphone"
                value={data.contact?.phone || ""}
                onChange={handleNestedChange}
              />
            </div>

            {/* Socials */}
            <div className="md:col-span-2">
              <h3 className="text-lg mt-4 font-semibold text-white">
                Réseaux sociaux
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {["linkedin", "facebook", "instagram", "X"].map((key) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-white capitalize">
                      {key}
                    </label>
                    <Input
                      name={key}
                      placeholder={`Lien ${key}`}
                      value={data.socials?.[key] || ""}
                      onChange={handleSocialChange}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-2">
              <h3 className="text-lg mt-4 font-semibold text-white">Liens</h3>
              {(data.links || []).map((link, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-center mb-2"
                >
                  <div className="col-span-5">
                    <Input
                      name={`link-title-${index}`}
                      label="Titre"
                      placeholder="Titre"
                      value={link.title}
                      onChange={(e) =>
                        handleLinkChange(index, {
                          ...link,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      name={`link-url-${index}`}
                      label="Lien"
                      placeholder="https://..."
                      value={link.url}
                      onChange={(e) =>
                        handleLinkChange(index, {
                          ...link,
                          url: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1 flex justify-end pt-6">
                    <button
                      type="button"
                      onClick={() => handleDeleteLink(index)}
                      className="text-red-500 hover:text-red-700 font-bold text-xl"
                      title="Supprimer le lien"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
              <Button variant="secondary" onClick={addNewLink}>
                Ajouter un lien
              </Button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-white/20">
          <Button onClick={onClose} variant="secondary">
            Annuler
          </Button>
          <Button onClick={onSave}>Enregistrer</Button>
        </div>
      </div>
    </div>
  );
}
