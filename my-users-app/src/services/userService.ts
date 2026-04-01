import { supabase } from '@/services/supabase'
import type { User } from '@/types/user'

export const userService = {
  async getAll(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(`Ошибка загрузки данных: ${error.message}`)
    }

    return data as User[]
  },
}
