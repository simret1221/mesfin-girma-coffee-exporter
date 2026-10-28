const API_BASE_URL =
  import.meta.env.VITE_API_URL || '/api';

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const contentType =
    response.headers.get('content-type') || '';

  const isJson =
    contentType.includes('application/json');

  const data = isJson
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === 'object' &&
      data !== null &&
      'message' in data
        ? String(data.message)
        : `API request failed with status ${response.status}`;

    throw new Error(message);
  }

  if (!isJson) {
    throw new Error(
      `The API returned HTML/text instead of JSON. ` +
      `Check that the backend API is running at ${API_BASE_URL}.`
    );
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'GET'
    }),

  post: <T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data !== undefined
        ? JSON.stringify(data)
        : undefined
    }),

  put: <T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data !== undefined
        ? JSON.stringify(data)
        : undefined
    }),

  delete: <T>(
    endpoint: string,
    options?: RequestInit
  ) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'DELETE'
    })
};