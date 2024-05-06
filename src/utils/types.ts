import { ButtonHTMLAttributes } from 'react';

export interface Todo {
  id: number;
  title: string;
  content: string;
  completed?: boolean;
}

export interface Comment {
  id: number;
  todoId: number;
  text: string;
}

export interface CommentsProps {
  todoId: number;
}

export interface NewComment {
  todoId: number;
  text: string;
}

export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}

export interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export interface CommentItemProps {
  text: string;
  onEdit: () => void;
  onDelete: () => void;
}

export interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggleComplete: () => void;
  onDelete: () => void;
}
