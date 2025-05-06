
import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { SocialIcon } from "react-social-icons";

export default function ProfilePageView() {
  const handleAddContact = () => {
    const vcfData = `
  BEGIN:VCARD
  VERSION:3.0
  FN:Beverly Little
  TITLE:Javascript Developer
  TEL;TYPE=cell:+1234567890
  EMAIL:beverly.little@example.com
  END:VCARD
  `;

    const blob = new Blob([vcfData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Beverly_Little.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="transition-all duration-500 min-h-screen">
      <div className="relative">
        <div className="relative mb-20 h-[190px] bg-[#E07A5F]">
          <img
            className="w-full max-h-[190px] object-cover"
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <img
            src="https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-0.3.5&s=9358d797b2e1370884aa51b0ab94f706&auto=format&fit=crop&w=200&q=80%20500w"
            className="w-[170px] h-[170px] rounded-full border-[5px] border-[#F4F1DE] absolute left-1/2 top-1/2 transform -translate-x-1/2"
          />
        </div>

        <h3 className="text-center text-white text-xl font-semibold">
          Beverly Little
        </h3>
        <p className="text-center text-[#7C8097] uppercase text-xs tracking-wider pt-2 pb-3 font-light">
          Javascript Developer
        </p>
        <p className="text-center text-[#b7b7bf] text-sm font-light mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aliquam
          aliquid porro!
        </p>
        <div className="w-full flex items-center mb-4">
          <button
            onClick={handleAddContact}
            className="px-8 mx-auto h-[60px] rounded-[12px] bg-[#5768fd] text-[#ffffff] font-light shadow-md"
          >
            Ajouter au contact
          </button>
        </div>
        {/* <div className="flex justify-center gap-4">
          <div className="w-[130px] h-[42px] rounded-[12px] bg-[#3D405B] text-[#F4F1DE] font-light shadow-md">
            Email
          </div>
          <button className="w-[130px] h-[42px] rounded-[12px] bg-[#3D405B] text-[#F4F1DE] font-light shadow-md">
            Téléphone
          </button>
        </div> */}
      </div>

      <div className="p-4">
        <h3 className="text-center text-[#dcdfff] text-lg mt-4">
          Let's connect
        </h3>
        <div className="flex justify-center gap-2 flex-wrap px-12">
          <SocialIcon url="https://x.com" />
          <SocialIcon url="https://facebook.com" />
          <SocialIcon url="https://google.com" />
          <SocialIcon url="https://linkedin.com" />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {/* Email Card */}
        <a
          href="mailto:wissemchihaoui7@gmail.com"
          className="flex items-center gap-4 p-4 border rounded-xl shadow-md hover:shadow-lg transition"
        >
          <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold">
          <MdEmail className="text-2xl text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Email</span>
            <span className="text-base font-medium text-gray-100">
              wissemchihaoui7@gmail.com
            </span>
          </div>
        </a>

        {/* Phone Card */}
        <a
          href="tel:+21696525978"
          className="flex items-center gap-4 p-4 border rounded-xl shadow-md hover:shadow-lg transition"
        >
          <div className="bg-green-100 text-green-600 w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold">
          <MdPhone className="text-2xl text-green-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Téléphone</span>
            <span className="text-base font-medium text-gray-100">
              +216 96 525 978
            </span>
          </div>
        </a>
        <div className="flex items-center gap-4 p-4 border rounded-xl shadow-md hover:shadow-lg transition">
          <div className="bg-yellow-100 text-yellow-600 w-10 h-10 flex items-center justify-center rounded-full">
          <MdLocationOn className="text-2xl text-red-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Adresse</span>
            <span className="text-base font-medium text-gray-100">
              123 Rue Habib Bourguiba, Tunis, Tunisie
            </span>
          </div>
        </div>
      </div>

      {/* <div className="fixed"></div> */}
    </div>
  );
}
