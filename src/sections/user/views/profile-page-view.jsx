import React from "react";
import {
  socialFb,
  socialGoogle,
  socialLinkedin,
  socialX,
} from "../../../assets";

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
    <div className="transition-all duration-500">
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
        <div className="flex justify-center gap-4">
          <button className="w-[130px] h-[42px] rounded-[12px] bg-[#3D405B] text-[#F4F1DE] font-light shadow-md">
            Email
          </button>
          <button className="w-[130px] h-[42px] rounded-[12px] bg-[#3D405B] text-[#F4F1DE] font-light shadow-md">
            Téléphone
          </button>
        </div>
      </div>

      <h3 className="text-center text-[#dcdfff] text-lg mt-4">Let's connect</h3>
      <div className="p-4">
        <div className="flex justify-center gap-9 mt-5 px-12">
          <a href="/" title="Facebook">
            <img src={socialFb} width={28} />
          </a>
          <a href="/" title="LinkedIn">
            <img src={socialLinkedin} width={28} />
          </a>
          <a href="/" title="X">
            <img src={socialX} width={28} />
          </a>
          <a href="/" title="Google">
            <img src={socialGoogle} width={28} />
          </a>
        </div>
        <div className="w-full flex flex-col items-center mt-12 gap-2">
          <button className="w-[130px] h-[42px] rounded-[12px] bg-[#3D405B] text-[#F4F1DE] font-light shadow-md">
            Let's meet
          </button>
          <button className="w-[130px] h-[42px] rounded-[12px] bg-[#3D405B] text-[#F4F1DE] font-light shadow-md">
            Our video
          </button>
        </div>
      </div>
      <div className="fixed"></div>
    </div>
  );
}
