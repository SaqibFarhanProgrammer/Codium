'use client';

import Login from '@/components/auth-component/Login';
import Register from '@/components/auth-component/Register';
import { Context, useAppContext } from '@/context/context';
import { redirect } from 'next/navigation';
import React, { useContext } from 'react';

function Page() {
  const islogin = true;
  if (islogin) {
    redirect('/blog/blogposts');
  }
  const { toggleAuth } = useContext(Context);

  return <div>{toggleAuth === 'register' ? <Register /> : <Login />}</div>;
}

export default Page;
