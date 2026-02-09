'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function WriteBlog() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const [Image, setImage] = useState(null);
  const [loadingUploadImage, setloadingUploadImage] = useState(false);
  const [Preview, setPreview] = useState(null);

  async function handlePublish(data) {
    setloadingUploadImage(true);
    const formData = new FormData();
    formData.append('file', Image);

    const res = await axios.post('/api/upload', formData);
    console.log('upload success');

    const CloudineryData = await res.data;
    setloadingUploadImage(false);

    console.log(CloudineryData);

    const { title, content } = data;

    try {
      const response = await axios.post('/api/blog/create', {
        title: title,
        content: content,
        image: CloudineryData.url,
      });

      console.log(response);

      router.push('/profile');
    } catch (error) {
      console.log('request error ' + error);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-20 mt-16">
      <div className="max-w-3xl mx-auto px-6">
        <form className="space-y-8" onSubmit={handleSubmit(handlePublish)}>
          <div>
            <input
              type="text"
              placeholder="Title"
              {...register('title')}
              className="w-full bg-transparent text-4xl font-light text-neutral-100 placeholder:text-neutral-700 outline-none border-none"
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
            {loadingUploadImage ? (
              <h3 className="text-sm text-zinc-400 mb-4">Uploading</h3>
            ) : (
              <h3 className="text-sm text-zinc-400 mb-4">upload image</h3>
            )}

            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0], setPreview(URL.createObjectURL(e.target.files[0])));
                }}
                className="hidden"
              />

              {Preview ? (
                <img src={Preview} className="w-full h-[50%]" alt="" />
              ) : (
                <div className="w-full h-64 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden hover:bg-white/10 transition">
                  <span className="text-sm text-zinc-500"></span>
                </div>
              )}
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
