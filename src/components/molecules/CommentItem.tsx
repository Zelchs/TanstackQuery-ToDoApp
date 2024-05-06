import React from 'react';
import Button from '../atoms/Button';
import { CommentItemProps } from '../../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Button>
        <Button onClick={onDelete} className="btn-danger ml-2">
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </Button>
      </span>
    </li>
  );
};

export default CommentItem;
