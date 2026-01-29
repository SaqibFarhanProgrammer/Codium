"use client";

import { useState } from "react";

export default function WriteBlog_profile_picture({ onChange }) {
  const [preview, setPreview] = useState(null);

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  }

  return (
    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-sm text-zinc-400 mb-4">Featured image</h3>

      <label className="cursor-pointer block">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

        <div className="w-full h-64 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden hover:bg-white/10 transition">
          {preview ? (
            <img
              src={preview}
              alt="Featured"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-zinc-500">
              Click to upload cover image
            </span>
          )}
        </div>
      </label>
    </section>
  );
}
