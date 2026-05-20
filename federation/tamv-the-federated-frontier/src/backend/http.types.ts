export interface HttpRequestBody {
  [key: string]: unknown;
}

export interface HttpJsonResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}
