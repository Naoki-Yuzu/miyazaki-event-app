import React, { ButtonHTMLAttributes, ReactNode } from 'react';

const Button = ({children, className, ...props}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode;}) => {
  return (
    <button className={`text-xs sm:text-base rounded-xl font-semibold border-orange-300 border-2 py-1 px-3 hover:opacity-75 duration-200 tracking-widest ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;