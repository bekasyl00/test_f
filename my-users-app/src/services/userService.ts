import axios, { AxiosError } from 'axios'
import type { User } from '@/types/user'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Превышено время ожидания запроса'))
    }
    if (!error.response) {
      return Promise.reject(new Error('Нет соединения с сервером'))
    }
    const status = error.response.status
    if (status === 404) return Promise.reject(new Error('Данные не найдены'))
    if (status >= 500) return Promise.reject(new Error('Ошибка сервера'))
    return Promise.reject(new Error(`Ошибка запроса: ${status}`))
  }
)

export const userService = {
  getAll(): Promise<User[]> {
    return api.get<User[]>('/users').then((response) => response.data)
  },

  getById(id: number): Promise<User> {
    return api.get<User>(`/users/${id}`).then((response) => response.data)
  },
}
