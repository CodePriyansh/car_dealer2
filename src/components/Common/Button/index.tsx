import React, { ReactNode, MouseEvent } from 'react';
import styles from './styles.module.css';

// Define the props interface
interface ButtonProps {
  children: ReactNode; // ReactNode is the type for children
  otherStyles?: string; // Optional string type for additional styles
  onclick?: (event: MouseEvent<HTMLDivElement>) => void; // Optional click handler with event type
  lightButton?: boolean; // Optional boolean for lightButton
}

// Functional component using TypeScript
const Button: React.FC<ButtonProps> = ({ children, otherStyles = '', onclick, lightButton = false }) => {
  return (
    <div
      className={`bg-primary rounded-[50px] py-3 justify-center font-rajdhani font-bold cursor-pointer text-white text-base flex items-center px-4 gap-2 ${otherStyles}`}
      onClick={onclick}
    >
      {children}
    </div>
  );
};

export default Button;
