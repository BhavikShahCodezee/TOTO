import api from './api';
import { User } from '../types';

export const signup = async (username: string, password: string) => {
  const { data } = await api.post<User>('/users', { username, password });
  return data;
};

export const login = async (username: string, password: string) => {
  const { data } = await api.get<User[]>(`/users?username=${username}&password=${password}`);
  return data.length > 0 ? data[0] : null;
};
