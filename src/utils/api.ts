import axios from 'axios';
import { Todo, Comment } from './types';

const BASE_URL = 'http://localhost:3004';

export const getTodos = () => {
  return axios.get(`${BASE_URL}/todos`);
};

export const getTodo = async (id: string): Promise<Todo> => {
  const response = await axios.get<Todo>(`${BASE_URL}/todos/${id}`);
  return response.data;
};

export const addTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await axios.post<Todo>(`${BASE_URL}/todos`, todo);
  return response.data;
};

export const updateTodo = (id: string, data: Partial<Todo>) => {
  return axios.patch(`${BASE_URL}/todos/${id}`, data);
};

export const deleteTodo = (id: number) => {
  return axios.delete(`${BASE_URL}/todos/${id}`);
};

export const toggleTodo = (id: number, completed: boolean) => {
  return axios.patch(`${BASE_URL}/todos/${id}`, { completed });
};

export const getComments = async (todoId: number) => {
  const { data } = await axios.get(`${BASE_URL}/comments?todoId=${todoId}`);
  return data;
};

export const addComment = async (
  newComment: Omit<Comment, 'id'>
): Promise<Comment> => {
  try {
    const response = await axios.post<Comment>(
      `${BASE_URL}/comments`,
      newComment
    );
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const editComment = (id: number, newText: string) => {
  return axios.patch(`${BASE_URL}/comments/${id}`, { text: newText });
};

export const deleteComment = (id: number) => {
  return axios.delete(`${BASE_URL}/comments/${id}`);
};

// Rick and Morty
export const fetchCharacters = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${pageParam}`
  );
  return response.data;
};
