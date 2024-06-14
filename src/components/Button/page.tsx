import React from 'react';

interface ButtonProps {
  text: string;
  className:string
}

const Button: React.FC<ButtonProps> = ({ text,className }) => {
  return (
    <div>
      <button className={`bg-primary rounded-[30px] p-3 text-white text-base ${className}`}>{text}</button>
    </div>
  );
}

export default Button;
