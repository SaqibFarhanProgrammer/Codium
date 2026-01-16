import HomePage from '@/components/HomePage';
import Navbar from '@/components/Navbar';
import React from 'react';
import { islogin } from '../../appConfig';
import { redirect } from 'next/navigation';

function page() {
    if (!islogin) {
    redirect('/blog');
  }

  return (
    <div className="">
      <HomePage />
    </div>
  );
}

export default page;
