import axios from 'axios';
import type { Todo, CreateTodoDto, UpdateTodoDto, FilterTodoDto, TodosResponse } from '@/types/todo';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  getAll: async (filters: FilterTodoDto = {}): Promise<TodosResponse> => {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);

    const response = await api.get<TodosResponse>(`/todos?${params.toString()}`);
    return response.data;
  },

  getOne: async (id: number): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  create: async (data: CreateTodoDto): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', data);
    return response.data;
  },

  update: async (id: number, data: UpdateTodoDto): Promise<Todo> => {
    const response = await api.patch<Todo>(`/todos/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
