'use client';

import WriteBlog_profile_picture from '@/components/WriteBlog/WriteBlog_Picture_upload';

export default function WriteBlog() {
  return (
    <div className="min-h-screen bg-neutral-950 py-20 mt-15">
      <div className="max-w-3xl mx-auto px-6">
        {/* Editor */}
        <div className="space-y-8">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className="w-full bg-transparent text-4xl font-light text-neutral-100 placeholder:text-neutral-700 outline-none border-none focus:ring-0"
          />

          {/* Description */}
          <input
            type="text"
            placeholder="Short description..."
            className="w-full bg-transparent text-lg text-neutral-400 placeholder:text-neutral-700 outline-none border-none focus:ring-0"
          />

          {/* Content */}
          <textarea
            rows={16}
            placeholder="Tell your story..."
            className="w-full bg-transparent text-neutral-300 placeholder:text-neutral-700 outline-none resize-none leading-relaxed text-base border-none focus:ring-0"
          />

          {/* Divider */}
          <div className="border-t border-neutral-900" />

          {/* Image Upload */}
          <WriteBlog_profile_picture />

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button className="px-6 py-2.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
              Save draft
            </button>

            <button className="px-6 py-2.5 text-sm bg-neutral-100 text-neutral-950 rounded-full hover:bg-neutral-300 transition-colors font-medium">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
