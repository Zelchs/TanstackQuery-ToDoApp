import React from 'react';
import { Alert } from 'antd';
import { ErrorProps } from '../../utils/types';

const Error: React.FC<ErrorProps> = ({ message }) => (
  <div>
    <Alert message="Error" description={message} type="error" showIcon />
  </div>
);

export default Error;
