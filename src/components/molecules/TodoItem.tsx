import React from 'react';
import { Link } from '@tanstack/react-router';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { TodoItemProps } from '../../utils/types';

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          <Link
            to={`/todos/${id}`}
            className={completed ? 'text-decoration-line-through' : ''}
          >
            {title}
          </Link>
        </h5>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <div>
          <Button
            onClick={onToggleComplete}
            className={completed ? 'btn btn-warning' : 'btn btn-success'}
          >
            {completed ? (
              <>
                <FontAwesomeIcon icon={faTimes} /> Mark Incomplete
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCheck} /> Mark Complete
              </>
            )}
          </Button>
          <Button onClick={onDelete} className="btn btn-danger ml-2">
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button>
          <Link to={`/edit/todo/${id}`} className="btn btn-primary">
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
