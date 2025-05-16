import React, { useMemo } from "react";
import Input from "../../components/input/input";
import Button from "../../components/button/Button";
import Select from "../../components/select/select";
import FileInput from "../../components/file-input/file-input";
import { useAuthContext } from "../../auth/hooks";

export default function VkardEditModal({
  show,
  onClose,
  data,
  setData,
  onSave,
}) {
  const { user } = useAuthContext();

  const parseJSON = (value, fallback = {}) => {
    try {
      return typeof value === "string" ? JSON.parse(value) : value || fallback;
    } catch {
      return fallback;
    }
  };

  const normalizedData = useMemo(() => ({
    id: data?.id || "",
    name: data?.name || "",
    company: data?.company || "",
    admin: `${user?.first_name || ""} ${user?.last_name || ""}`,
    // cardType: data?.card_type || "",
    description: data?.description || "",
    picture: data?.picture || "",
    contact: parseJSON(data?.contact, { email: "", phone: "" }),
    socials: parseJSON(data?.socials, {
      linkedin: "",
      facebook: "",
      instagram: "",
      X: "",
    }),
    links: parseJSON(data?.links, [])
  }), [data, user]);

  if (!show || !data) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      contact: JSON.stringify({
        ...(parseJSON(prev.contact, {})),
        [name]: value,
      }),
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      socials: JSON.stringify({
        ...(parseJSON(prev.socials, {})),
        [name]: value,
      }),
    }));
  };

  const handleLinkChange = (index, field, value) => {
    const links = parseJSON(data.links, []);
    links[index] = { ...links[index], [field]: value };
    setData((prev) => ({ ...prev, links: JSON.stringify(links) }));
  };

  const handleDeleteLink = (index) => {
    const links = parseJSON(data.links, []);
    links.splice(index, 1);
    setData((prev) => ({ ...prev, links: JSON.stringify(links) }));
  };

  const addNewLink = () => {
    const links = parseJSON(data.links, []);
    links.push({ title: "", url: "" });
    setData((prev) => ({ ...prev, links: JSON.stringify(links) }));
  };

 const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setData((prev) => ({ ...prev, picture: file }));
  }
};

  const handleSubmit = () => {
  // const formData = new FormData();
  console.log(data)

  onSave(data); // This should be the function that calls the API
};

  return (
    <div className="mt-[0!important] fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-n-7 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <h2 className="text-xl font-semibold">Modifier la carte</h2>
          <button onClick={onClose} className="text-2xl leading-none">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" placeholder="Nom" value={data.name || ""} onChange={handleChange} />
            <Input name="company" placeholder="Entreprise" value={data.company || ""} onChange={handleChange} />
            <Input name="admin" value={normalizedData.admin} readOnly disabled />
            {/* <Select
              label="Type de carte"
              name="card_type"
              value={data.card_type || ""}
              onChange={handleChange}
              options={[
                { value: 1, label: "Standard" },
                { value: 2, label: "Premium" },
                { value: 3, label: "VIP" },
              ]}
            /> */}
            <Input name="description" placeholder="Description" value={data.description || ""} onChange={handleChange} />
            <FileInput label="Photo" onChange={handleImageUpload} preview={data.picture} />
            <Input name="email" placeholder="Email" value={normalizedData.contact.email} onChange={handleNestedChange} />
            <Input name="phone" placeholder="Téléphone" value={normalizedData.contact.phone} onChange={handleNestedChange} />

            <div className="md:col-span-2">
              <h3 className="text-lg mt-4 font-semibold text-white">Réseaux sociaux</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {["linkedin", "facebook", "instagram", "X"].map((key) => (
                  <div key={key}>
                    <Input
                      name={key}
                      placeholder={`Lien ${key}`}
                      value={normalizedData.socials[key]}
                      onChange={handleSocialChange}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg mt-4 font-semibold text-white">Liens</h3>
              {normalizedData.links.map((link, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center mb-2">
                  <div className="col-span-5">
                    <Input
                      placeholder="Titre"
                      value={link.title}
                      onChange={(e) => handleLinkChange(index, "title", e.target.value)}
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      placeholder="https://..."
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, "url", e.target.value)}
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
              <Button variant="secondary" onClick={addNewLink}>Ajouter un lien</Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-white/20">
          <Button onClick={onClose} variant="secondary">Annuler</Button>
          <Button onClick={handleSubmit}>Enregistrer</Button>
        </div>
      </div>
    </div>
  );
}
