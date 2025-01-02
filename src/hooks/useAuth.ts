import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface User {
  userId: string;
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Función auxiliar para manejar cookies
const getCookie = (name: string) => {
 return document.cookie
   .split('; ')
   .find(row => row.startsWith(`${name}=`))
   ?.split('=')[1];
};

const setCookie = (name: string, value: string, days = 1) => {
 const maxAge = days * 24 * 60 * 60;
 document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Strict`;
};

const deleteCookie = (name: string) => {
 document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};

export const useAuth = () => {
 const [user, setUser] = useState<User | null>(null);
 const [loading, setLoading] = useState(true);
 const router = useRouter();

 useEffect(() => {
   const token = getCookie('token_dashboard_nomada');
   
   if (token) {
     try {
       const decodedToken = jwtDecode<User>(token);
       setUser(decodedToken);
     } catch (error) {
       console.error('Error decoding token:', error);
       deleteCookie('token_dashboard_nomada');
     }
   }
   
   setLoading(false);
 }, []);

 const login = async (email: string, password: string) => {
   try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

     const data = await res.json();

     if (!res.ok) throw new Error(data.message || 'Error en el login');

     // Guardar token en cookie
     setCookie('token_dashboard_nomada', data.token);
     
     // Decodificar y guardar datos del usuario
     const decodedToken = jwtDecode<User>(data.token);
     setUser(decodedToken);
     
     router.push('/clients');
   } catch (error) {
     console.error('Login error:', error);
     throw error;
   }
 };

 const logout = () => {
   deleteCookie('token_dashboard_nomada');
   setUser(null);
   router.push('/');
 };

 return { 
   user, 
   loading, 
   login, 
   logout,
   isAuthenticated: !!user
 };
};