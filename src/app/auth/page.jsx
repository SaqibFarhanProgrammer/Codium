'use client';

import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { Context, useAppContext } from '@/context/context';
import { redirect } from 'next/navigation';
import React, { useContext } from 'react';

function Page() {
const islogin  =true
  if(islogin){
    redirect('/blog/blogposts')
  }
  const { toggleAuth, settoggleAuth } = useContext(Context);

  return <div>{toggleAuth === 'register' ? <Register /> : <Login />}</div>;
}

export default Page;
