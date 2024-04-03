interface IResponse {
  data: unknown;
  timestamp: string;
  error: string;
}

interface IHttpClient {
  get: (url: string) => Promise<IResponse>;
  post: (url: string, body: object) => Promise<IResponse>;
  put: (url: string, body: object) => Promise<IResponse>;
  delete: (url: string) => Promise<IResponse>;
  patch: (url: string, body: object) => Promise<IResponse>;
}
export const httpClient: IHttpClient = {
  get: async (url: string) => {
    let data: unknown = {};
    let errorMessage: unknown = '';
    try {
      const response = await fetch(url);
      data = await response.json();
    } catch (e: any) {
      console.error(e);
      errorMessage = e.message;
    }

    return {
      data,
      timestamp: new Date().toISOString(),
      error: errorMessage as string
    } satisfies IResponse;
  },
  post: async (url: string, body: object) => {
    return {
      data: {},
      timestamp: new Date().toUTCString(),
      error: ''
    } satisfies IResponse;
  },
  put: async (url: string, body: object) => {
    return {
      data: {},
      timestamp: new Date().toUTCString(),
      error: ''
    } satisfies IResponse;
  },
  delete: async (url: string) => {
    return {
      data: {},
      timestamp: new Date().toUTCString(),
      error: ''
    } satisfies IResponse;
  },
  patch: async (url: string, body: object) => {
    return {
      data: {},
      timestamp: new Date().toUTCString(),
      error: ''
    } satisfies IResponse;
  }
};
