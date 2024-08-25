interface IResponse<T> {
  ok: boolean;
  data?: T | undefined;
  error?: string | undefined;
  status: number;
  timestamp: string;
}

interface IHttpOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  url: string;
  abortController?: AbortController;
}

export const httpClient = async <T>(
  options: IHttpOptions
): Promise<IResponse<T>> => {
  const defaultOptions: IHttpOptions = {
    retries: 0,
    retryDelay: 1000,
    timeout: 8000,
    url: '',
    abortController: undefined
  };

  const baseOptions: IHttpOptions = {
    ...defaultOptions,
    ...options
  };

  try {
    const {
      url: urlOption,
      timeout: timeoutOption,
      abortController: abortControllerOption,
      retries: retriesOption,
      retryDelay: retryDelayOption,
      ...naturalOptions
    } = baseOptions;

    const response = await fetch(urlOption, {
      ...naturalOptions,
      signal: AbortSignal.timeout(baseOptions.timeout as number)
    });

    if (!response.ok) {
      return {
        status: response.status,
        ok: false,
        error: 'Not ok response',
        timestamp: new Date().toISOString()
      } satisfies IResponse<T>;
    }

    const data: T = (await response.json()) as T;

    return {
      ok: true,
      data,
      status: response.status,
      timestamp: new Date().toISOString()
    } satisfies IResponse<T>;
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: `Request fail. ${
        error instanceof Error ? (error.message as string) : (error as string)
      }`,
      timestamp: new Date().toISOString()
    } satisfies IResponse<T>;
  }
};
