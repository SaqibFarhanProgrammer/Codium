'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { IoIosCloseCircleOutline } from 'react-icons/io';

function BlogForm() {
  return (
    <div className="min-h-screen w-200 left-90  fixed   top-2 -100 flex items-center justify-center px-4">
      <div className="w-full bg-white p-6 relative rounded-lg border border-gray-200">
        <h1 className="text-2xl font-semibold mb-6 text-black">Write Blog Post</h1>

        <IoIosCloseCircleOutline className="text-3xl text-black absolute right-1 top-1" />
        <form className="space-y-5 relative">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter blog title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDesc">Short Description</Label>
            <Input id="shortDesc" placeholder="Short summary for listing" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Write full blog content"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Cover Image</Label>
            <Input id="image" type="file" />
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-900">Publish Blog</Button>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;
