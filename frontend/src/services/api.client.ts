const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export class ApiError extends Error {
  code: string;
  details?: any;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', details?: any) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem('hp_access_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.error?.message || response.statusText || 'An unexpected error occurred';
    const errorCode = data?.error?.code || `HTTP_${response.status}`;
    const details = data?.error?.details;

    if (response.status === 401 && !endpoint.includes('/auth/login')) {
      // Clear token on 401 unauthorized
      localStorage.removeItem('hp_access_token');
      localStorage.removeItem('hp_refresh_token');
    }

    throw new ApiError(errorMsg, errorCode, details);
  }

  return data?.data !== undefined ? data.data : data;
}
