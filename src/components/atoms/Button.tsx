import React from 'react';
import { ButtonProps } from '../../utils/types';

const Button: React.FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button className={`btn m-1 ${className || ''}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
