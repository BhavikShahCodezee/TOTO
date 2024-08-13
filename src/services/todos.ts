import api from './api';
import { Todo } from '../types';

export const getTodos = async () => {
  const { data } = await api.get<Todo[]>('/todos');
  return data;
};

export const addTodo = async (text: string) => {
  const { data } = await api.post<Todo>('/todos', { text, completed: false });
  return data;
};

export const updateTodo = async (id: number, updates: Partial<Todo>) => {
  const { data } = await api.patch<Todo>(`/todos/${id}`, updates);
  return data;
};

export const deleteTodo = async (id: number) => {
  await api.delete(`/todos/${id}`);
};
