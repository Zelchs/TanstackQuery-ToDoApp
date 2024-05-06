import React from 'react';
import { TextareaProps } from '../../utils/types';

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  className,
  placeholder,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`form-control ${className || ''}`}
      placeholder={placeholder}
      required
    />
  );
};

export default Textarea;
