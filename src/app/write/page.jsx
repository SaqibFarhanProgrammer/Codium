'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function WriteBlog() {
  const { register, handleSubmit, setValue } = useForm();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // async function handleFileUpload(e) {
  //   try {
  //     const { signature, timestamp, api_key, cloud_name } = await axios
  //       .get('/api/CloudinerySign')
  //       .then((res) => res.data);

  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('api_key', api_key);
  //     formData.append('timestamp', timestamp);
  //     formData.append('signature', signature);

  //     const url = `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`;

  //     const res = await fetch(url, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const data = await res.json();

  //     setImageUrl(data.secure_url);
  //     setValue('featuredImage', data.secure_url);
  //   } catch (err) {
  //     console.error('Upload failed', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function handleFileUpload(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
  }

  async function onSubmit(data) {
    console.log('Form Data:', data);
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-20 mt-16">
      <div className="max-w-3xl mx-auto px-6">
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Title"
              {...register('title')}
              className="w-full bg-transparent text-4xl font-light text-neutral-100 placeholder:text-neutral-700 outline-none border-none"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Short description..."
              {...register('description')}
              className="w-full bg-transparent text-lg text-neutral-400 placeholder:text-neutral-700 outline-none border-none"
            />
          </div>

          <div>
            <textarea
              rows={16}
              placeholder="Tell your story..."
              {...register('content')}
              className="w-full bg-transparent text-neutral-300 placeholder:text-neutral-700 resize-none leading-relaxed text-base border-none outline-none"
            />
          </div>

          <div className="border-t border-neutral-900" />

          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm text-zinc-400 mb-4">Featured image</h3>

            <label className="cursor-pointer block">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

              <div className="w-full h-64 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden hover:bg-white/10 transition">
                {preview ? (
                  <img src={preview} alt="Featured" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm text-zinc-500">
                    {loading ? 'Uploading...' : 'Click to upload cover image'}
                  </span>
                )}
              </div>
            </label>
          </section>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-2.5 text-sm text-neutral-500 hover:text-neutral-300"
            >
              Save draft
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 text-sm bg-neutral-100 text-neutral-950 rounded-full hover:bg-neutral-300 font-medium"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
