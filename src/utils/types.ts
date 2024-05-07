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

//Rick and Morty

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

export interface CharacterCardProps {
  character: Character;
}

export interface CharacterWithIndexSignature extends Character {
  [key: string]: unknown;
}

export interface CharactersTemplateProps {
  characters: Character[];
}

export interface ErrorProps {
  message: string;
}

export interface FetchCharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface FetchCharactersParams {
  pageParam: string;
  filters?: Record<string, string>;
  sort?: string;
}
