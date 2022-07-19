import React from 'react';

import { HttpStatusCode } from '../models/http-status-codes';

const useHttp = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const sendHttpRequest = React.useCallback(
    async (
      endpoint: string,
      requestConfig: RequestInit,
      responseHandlerFn: Function
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(endpoint, {
          method: requestConfig.method || 'GET',
          headers: requestConfig.headers || {},
          body: requestConfig.body || null
        });

        if (!response.ok) {
          throw new Error('Response failed!');
        }

        const responseData = await response.json();

        if (response.status && response.status !== HttpStatusCode.Ok) {
          throw new Error(responseData.message);
        }

        responseHandlerFn(responseData);
      } catch (error: any) {
        setError(error.message || 'Something went wrong');
      }

      setLoading(false);
    },
    []
  );

  return { loading, error, sendHttpRequest };
};

export default useHttp;
