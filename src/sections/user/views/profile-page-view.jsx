import React from "react";
import { MdEmail, MdPhone, MdLocationOn, MdSave } from "react-icons/md";
import { SocialIcon } from "react-social-icons";
import { CONFIG } from "../../../config-global";
import { userIcon } from "../../../assets";
import { Link } from "react-router-dom";

export default function ProfilePageView({ profile }) {
  if (!profile) return <p>Chargement du profil...</p>;

  // Parse JSON fields
  const contact = typeof profile.contact === "string" ? JSON.parse(profile.contact) : profile.contact;
  const socials = typeof profile.socials === "string" ? JSON.parse(profile.socials) : profile.socials;
  const links = typeof profile.links === "string" ? JSON.parse(profile.links) : profile.links;

  // Handle vCard export
  const handleAddContact = () => {
    const vcfData = `
BEGIN:VCARD
VERSION:3.0
FN:${profile?.name}
TITLE:${profile?.company}
TEL;TYPE=cell:${contact?.phone}
EMAIL:${contact?.email}
END:VCARD
`;

    const blob = new Blob([vcfData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile?.name || "contact"}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Profile image
  const image = profile?.picture
    ? `${CONFIG.serverUrl}/storage/${profile?.picture}`
    : userIcon;

  return (
    <div className="transition-all duration-500 min-h-screen">
      {/* Header */}
      <div className="relative">
        <div className="relative mb-20 h-[190px] bg-[#E07A5F]">
          <img
            className="w-full max-h-[190px] object-cover"
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <img
            src={image}
            className="w-[170px] h-[170px] rounded-full border-[5px] border-[#F4F1DE] absolute left-1/2 top-1/2 transform -translate-x-1/2"
          />
        </div>

        <h3 className="text-center text-white text-xl font-semibold">{profile?.name}</h3>
        <p className="text-center text-[#7C8097] uppercase text-xs tracking-wider pt-2 pb-3 font-light">
          {profile?.company}
        </p>
        <p className="text-center text-[#b7b7bf] text-sm font-light mb-5 px-4">
          {profile?.description}
        </p>
        <div className="w-full flex items-center mb-4">
          <button
            onClick={handleAddContact}
            className="px-8 mx-auto h-[50px] rounded-[12px] bg-[#5768fd] text-[#ffffff] font-light shadow-md"
          >
            <div className="flex gap-3">
              <MdSave className="text-2xl" />
              Ajouter au contact
            </div>
          </button>
        </div>
      </div>

      {/* Social Links */}
      <div className="p-4">
        <h3 className="text-center text-[#dcdfff] text-lg mb-1">Let's connect</h3>
        <div className="flex justify-center gap-2 flex-wrap px-12">
          {links?.map((opt, index) => (
            <Link to={opt.url} key={index} target="_blank" rel="noopener noreferrer">
              <SocialIcon url={opt.url} />
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-4 p-4">
        {/* Email Card */}
        <a
          href={`mailto:${contact?.email}`}
          className="flex items-center gap-4 p-4 border rounded-xl shadow-md hover:shadow-lg transition"
        >
          <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold">
            <MdEmail className="text-2xl text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Email</span>
            <span className="text-base font-medium text-gray-100">
              {contact?.email}
            </span>
          </div>
        </a>

        {/* Phone Card */}
        <a
          href={`tel:${contact?.phone}`}
          className="flex items-center gap-4 p-4 border rounded-xl shadow-md hover:shadow-lg transition"
        >
          <div className="bg-green-100 text-green-600 w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold">
            <MdPhone className="text-2xl text-green-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Téléphone</span>
            <span className="text-base font-medium text-gray-100">
              {contact?.phone}
            </span>
          </div>
        </a>

        {/* Hardcoded Address */}
        <div className="flex items-center gap-4 p-4 border rounded-xl shadow-md hover:shadow-lg transition">
          <div className="bg-yellow-100 text-yellow-600 w-10 h-10 flex items-center justify-center rounded-full">
            <MdLocationOn className="text-2xl text-red-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Adresse</span>
            <span className="text-base font-medium text-gray-100">
              91 Rue de l'Alzette, 4011 Esch-sur-Alzette
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
