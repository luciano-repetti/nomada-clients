type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
  };
  
  export const fetchAuthorization = async (url: string, options: FetchOptions = {}) => {
    // Obtener el token de las cookies
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token_dashboard_nomada='))
      ?.split('=')[1];
  
    // Configurar headers base
    const headers = {
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
  
    return await fetch(url, config);
};