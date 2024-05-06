import React from 'react';
import Button from '../atoms/Button';
import { CommentItemProps } from '../../utils/types';

const CommentItem: React.FC<CommentItemProps> = ({
  text,
  onEdit,
  onDelete,
}) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{text}</span>
      <span className="ml-2">
        <Button onClick={onEdit} className="btn-primary">
          Edit
        </Button>
        <Button onClick={onDelete} className="btn-danger ml-2">
          Delete
        </Button>
      </span>
    </li>
  );
};

export default CommentItem;
