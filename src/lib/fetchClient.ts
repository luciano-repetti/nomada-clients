// Define una interfaz para el cuerpo de la petición
type JsonValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined 
  | { [key: string]: JsonValue } 
  | JsonValue[];

interface RequestBody {
  [key: string]: JsonValue;
}

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: RequestBody;
  headers?: Record<string, string>;
};

export const fetchAuthorization = async (
  url: string, 
  options: FetchOptions = {}
): Promise<Response> => {
  // Obtener el token de las cookies
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token_dashboard_nomada='))
    ?.split('=')[1];

  // Configurar headers base
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  // Configurar la petición
  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
    ...(options.body && { body: JSON.stringify(options.body) })
  };

  return fetch(url, config);
};