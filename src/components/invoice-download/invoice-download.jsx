import { STORAGE_KEY } from "../../constants";
import axios from "axios";

const InvoiceDownloadButton = ({ ref }) => {

const downloadInvoice = async (ref) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/invoice/${ref}`, {
      responseType: "blob", // important
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
        Accept: "application/pdf",
      },
    });

    // Check if the response is actually a PDF
    const file = new Blob([res.data], { type: "application/pdf" });

    // Create a URL and force the browser to download
    const fileURL = window.URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `Facture_${ref}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(fileURL);
  } catch (error) {
    console.error("❌ Erreur lors du téléchargement :", error);

    // Try to decode if it's a Laravel error page returned as HTML
    if (error.response?.data instanceof Blob) {
      const text = await error.response.data.text();
      console.warn("Server response:", text);
    }
  }
};

  return (
    <button
      className="bg-n-5 hover:bg-n-4 text-white text-sm font-medium px-4 py-2 rounded shadow"
      onClick={() => downloadInvoice(ref)}
    >
      Télécharger la facture
    </button>
  );
};

export default InvoiceDownloadButton;
