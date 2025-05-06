import React from "react";

const FileInput = ({ label, onChange, preview }) => {
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
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 rounded object-cover w-40"
        />
      )}
    </div>
  );
};

export default FileInput;
