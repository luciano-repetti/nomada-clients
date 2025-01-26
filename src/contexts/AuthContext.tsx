"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

interface User {
    userId: string
    email: string
    name: string
    role: string
    iat?: number
    exp?: number
}

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Funciones auxiliares para manejar cookies
const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null
    return document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1] || null
}

const setCookie = (name: string, value: string, days = 1) => {
    const maxAge = days * 24 * 60 * 60
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Strict`
}

const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = getCookie('token_dashboard_nomada')
        if (token) {
            try {
                const decodedToken = jwtDecode<User>(token)
                setUser(decodedToken)
            } catch (error) {
                console.error('Error decoding token:', error)
                deleteCookie('token_dashboard_nomada')
                setUser(null)
            }
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message || 'Error en el login')

            setCookie('token_dashboard_nomada', data.token)
            const decodedToken = jwtDecode<User>(data.token)
            setUser(decodedToken)

            router.push('/clients')
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }
    }

    const logout = () => {
        deleteCookie('token_dashboard_nomada')
        setUser(null)
        router.push('/')
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Hook personalizado para usar el contexto
export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}