import React from 'react';
import { Button } from './ui/button';
function MyButton({ title, exttraClass ,color }) {
  return (
    <>
      <Button className={` ${color} font-["medium"]  rounded-full  ${exttraClass}`}>
        {title}
      </Button>
    </>
  );
}

export default MyButton;
