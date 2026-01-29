"use client";

import WriteBlog_profile_picture from "@/components/WriteBlog/WriteBlog_Picture_upload";


export default function WriteBlog() {

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 space-y-10">
      {/* Text Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6">
        <input
          type="text"
          placeholder="Blog title"
          className="w-full bg-transparent text-4xl font-semibold outline-none placeholder:text-zinc-500"
        />

        <textarea
          rows={2}
          placeholder="Short description"
          className="w-full bg-transparent text-zinc-300 outline-none resize-none placeholder:text-zinc-500"
        />

        <textarea
          rows={12}
          placeholder="Write your story..."
          className="w-full bg-transparent text-zinc-200 outline-none resize-none leading-relaxed placeholder:text-zinc-500"
        />
      </div>

      {/* Image Section */}
      <WriteBlog_profile_picture/>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 rounded-full border border-white/20 text-white">
          Save draft
        </button>

        <button className="px-6 py-3 rounded-full bg-white text-black font-medium">
          Publish
        </button>
      </div>
    </section>
  );
}
