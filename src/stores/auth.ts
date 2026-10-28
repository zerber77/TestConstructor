import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('authToken'))

  // Главный геттер для проверки валидности токена
    const isAuthenticated = () => {
        if (!token.value) return false
        try {
            const decoded = decodePayload(token.value)
            const currentTime = Date.now() / 1000
             // Проверяем, не истек ли срок действия (exp)
            return decoded.exp > currentTime
        } catch (error) {
      // Если токен поврежден или некорректен
            return false
        }
    }

    function getTokenData():object|null{
        if (!token.value) return null
        try {
            const decoded = decodePayload(token.value)
            const currentTime = Date.now() / 1000
             // Проверяем, не истек ли срок действия (exp)
            return decoded.data
        } catch (error) {
      // Если токен поврежден или некорректен
            return null
        }
    }

    function decodePayload(token:string) {
    try {
        const [, payload] = token.split('.');
        // Base64URL → Base64
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        // Декодируем и парсим JSON
        return JSON.parse(atob(base64));
    } catch (e) {
        console.warn('Невозможно декодировать токен', e);
        return null;
    }
    }
    
    function setToken(newToken: string) {
        token.value = newToken
        localStorage.setItem('authToken', newToken)
    }

    function getToken() {
        return localStorage.getItem('authToken')
    }

    function logout() {
        token.value = null
        localStorage.removeItem('authToken')
    }

    return { token, isAuthenticated, setToken, getToken, getTokenData, logout }
})