'use client';

import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { Context, useAppContext } from '@/context/context';
import React, { useContext } from 'react';

function Page() {
  const { toggleAuth, settoggleAuth } = useContext(Context);

  console.log(toggleAuth);

  return <div>{toggleAuth === 'register' ? <Register /> : <Login />}</div>;
}

export default Page;
