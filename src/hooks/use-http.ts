import React from 'react';

import { HttpResponse } from '../models/api.interface';
import { HttpStatusCode } from '../models/http-status-codes';

const useHttp = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<{ message: string } | null>(null);

  const sendHttpRequest = React.useCallback(
    async (
      endpoint: string,
      requestConfig: RequestInit,
      responseHandlerFn: (response: HttpResponse<any>) => void,
      config?: {
        errorMessage: string;
      }
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(endpoint, {
          method: requestConfig.method || 'GET',
          headers: {
            ...(requestConfig.headers || {
              'Content-Type': 'application/json'
            })
            // ...(token ? { Authorization: `Bearer ${token.accessToken}` } : {})
          },
          ...(requestConfig.body && {
            body: requestConfig.body
          })
        });

        // if (!response.ok) {
        //   throw new Error('Response failed!');
        // }

        const responseData = await response.json();

        if (response.status !== HttpStatusCode.Ok) {
          throw new Error(responseData.message);
        }

        responseHandlerFn(responseData);
      } catch (error) {
        error instanceof Error &&
          setError({
            message:
              config?.errorMessage || error.message || 'Something went wrong'
          });
      }

      setLoading(false);
    },
    []
  );

  return { loading, error, sendHttpRequest };
};

export default useHttp;
