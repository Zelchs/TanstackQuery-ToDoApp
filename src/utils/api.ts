import axios from 'axios';
import {
  Todo,
  Comment,
  FetchCharactersResponse,
  FetchCharactersParams,
  Character,
} from './types';

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

export const fetchCharacters = async (
  params: FetchCharactersParams
): Promise<FetchCharactersResponse> => {
  try {
    const response = await axios.get<FetchCharactersResponse>(
      'https://rickandmortyapi.com/api/character',
      {
        params: {
          page: params.pageParam,
          ...params.filters,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.message);
      if (error.response && error.response.status === 404) {
        return {
          info: { count: 0, pages: 1, next: null, prev: null },
          results: [],
        };
      }
    }
    throw error;
  }
};

export const fetchCharacterDetails = async (id: number): Promise<Character> => {
  try {
    const response = await axios.get<Character>(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching character details:', error.message);
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred');
  }
};
