import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "react-toastify";

export default function LinkQrModal({ open, link, onClose }) {
  const qrRef = useRef(null);

  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => toast.dark("Lien copié dans le presse-papiers !"))
      .catch(() => toast.error("Échec de la copie du lien !"));
  };

  const handleOpenNewTab = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const linkEl = document.createElement("a");
    linkEl.href = url;
    linkEl.download = "qr-code.svg";
    document.body.appendChild(linkEl);
    linkEl.click();
    document.body.removeChild(linkEl);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-n-6 p-6 rounded shadow-xl w-full max-w-md text-center relative">
        <h2 className="text-xl font-bold mb-4">Lien de la carte</h2>

        <div ref={qrRef} className="bg-white p-2 rounded-sm w-min mx-auto mb-4">
          <QRCodeSVG value={link} size={150} className="mx-auto" />
        </div>

        <div className="flex items-center justify-center mb-4">
          <p className="break-all text-sm text-gray-100">{link}</p>
          <button
            onClick={handleCopy}
            className="ml-2 text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
          >
            Copier
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleDownloadQR}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Télécharger QR
          </button>

          <button
            onClick={handleOpenNewTab}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ouvrir
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
