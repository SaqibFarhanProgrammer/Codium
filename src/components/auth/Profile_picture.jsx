"use client";

import { useState } from "react";

export default function Profile_picture({ onChange }) {
  const [preview, setPreview] = useState(null);

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  }

  return (
    <div className="flex justify-center">
      <label className="relative cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

        <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden flex items-center justify-center hover:bg-white/10 transition">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-zinc-500 text-center leading-tight">
              Upload
              <br />
              photo
            </span>
          )}
        </div>
      </label>
    </div>
  );
}
