export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: BodyInit | Record<string, any> | null;
  query?: Record<string, string>;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
  token?: string,
): Promise<T> {
  const config = useRuntimeConfig();

  // const method: FetchOptions["method"] = options.method ?? "get";
  try {
    return (await $fetch<T>(`${config.apiBase}${endpoint}`, {
      method: options.method,
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "x-api-key": config.apiKey,
      },
      body: options.body,
      query: options.query,
    })) as T;
  } catch (err) {
    console.error("API Request Error:", err);
    throw err;
  }
}
