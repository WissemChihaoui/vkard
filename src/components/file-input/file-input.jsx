import React, { useEffect, useState } from "react";
import { CONFIG } from "../../config-global";

const FileInput = ({ label, onChange, preview, enabled = 1 }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (preview instanceof File) {
      const objectUrl = URL.createObjectURL(preview);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Clean up on unmount
    } else if (typeof preview === "string" && preview !== "") {
      // Assume it's a URL from the server
      setPreviewUrl(preview.startsWith("http") ? preview : `${CONFIG.serverUrl || ""}/storage/${preview}`);
    } else {
      setPreviewUrl(null);
    }
  }, [preview]);

  return (
    <div className="flex flex-col gap-2 bg-none">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="px-2 py-1 rounded-t-lg border-0 outline-none bg-transparent text-white"
        readOnly={!enabled}
        disabled={!enabled}
      />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="mt-2 rounded object-cover w-40 h-40"
        />
      )}
    </div>
  );
};

export default FileInput;
