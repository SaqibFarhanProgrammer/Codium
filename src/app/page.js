import HomePage from '@/components/HomePage';
import Navbar from '@/components/Navbar';
import React from 'react';
import { islogin } from '../../appConfig';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';

function page() {


  return (
    <div className="">
      <HomePage />
    </div>
  );
}

export default page;
