'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function WriteBlog() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handlePublish(data) {
    setLoading(true);
    setErrorMessage('');

    try {
      const { title, content } = data;
      let imageUrl = null;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadResponse = await axios.post('/api/upload', formData);
        imageUrl = uploadResponse.data.url;
      }

      await axios.post('/api/posts', {
        title,
        description: content.slice(0, 160),
        content,
        image: imageUrl,
      });

      reset();
      router.push('/profile');
    } catch (error) {
      setErrorMessage('Unable to publish the post. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <form className="space-y-8" onSubmit={handleSubmit(handlePublish)}>
          <div>
            <input
              type="text"
              placeholder="Title"
              {...register('title', { required: 'Title is required' })}
              className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-4xl font-semibold text-slate-900 outline-none focus:border-black"
            />
          </div>

          <div>
            <textarea
              rows={16}
              placeholder="Tell your story..."
              {...register('content', { required: 'Content is required' })}
              className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-slate-900 resize-none leading-relaxed text-base outline-none focus:border-black"
            />
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">Cover image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="w-full text-sm text-slate-700"
            />
            {preview && <img src={preview} alt="Preview" className="mt-4 h-64 w-full rounded-3xl object-cover" />}
          </section>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button type="button" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm text-slate-900 hover:bg-slate-100 transition">
              Save draft
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-slate-900 px-6 py-3 text-sm text-white font-semibold hover:bg-black transition disabled:opacity-60"
            >
              {loading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
