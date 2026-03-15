import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null })
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      const response = await axios.post(`${API_URL}/token`, formData)
      const { access_token, refresh_token } = response.data

      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('refreshToken', refresh_token)

      set({ 
        accessToken: access_token, 
        refreshToken: refresh_token, 
        isAuthenticated: true, 
        loading: false 
      })
      
      await get().fetchUser()
      return true
    } catch (error) {
      set({ error: error.response?.data?.detail || 'Login failed', loading: false })
      return false
    }
  },

  register: async (username, email, password) => {
    set({ loading: true, error: null })
    try {
      await axios.post(`${API_URL}/register`, { username, email, password })
      set({ loading: false })
      return true
    } catch (error) {
      set({ error: error.response?.data?.detail || 'Registration failed', loading: false })
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false })
  },

  fetchUser: async () => {
    const { accessToken } = get()
    if (!accessToken) return

    try {
      const response = await axios.get(`${API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      set({ user: response.data.user, wallets: response.data.wallets })
    } catch (error) {
      if (error.response?.status === 401) {
        await get().refreshAccessToken()
      } else {
        get().logout()
      }
    }
  },

  refreshAccessToken: async () => {
    const { refreshToken } = get()
    if (!refreshToken) return

    try {
      const response = await axios.post(`${API_URL}/refresh?refresh_token=${refreshToken}`)
      const { access_token, refresh_token: new_refresh_token } = response.data

      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('refreshToken', new_refresh_token)

      set({ accessToken: access_token, refreshToken: new_refresh_token })
      await get().fetchUser()
    } catch (error) {
      get().logout()
    }
  }
}))

export default useAuthStore
