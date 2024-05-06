import React from 'react';
import { InputProps } from '../../utils/types';

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  className,
  placeholder,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`form-control ${className || ''}`}
      placeholder={placeholder}
      required
    />
  );
};

export default Input;
