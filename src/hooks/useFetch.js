import { useState } from 'react';

function useFetch() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const makeFetch = async (url) => {
    const response = await fetch(url);

    try {
      setIsLoading(true);
      if (!response.ok) {
        const apiError = new Error(
          `A requisição da url: ${url}, falhou, status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      return await response.json();
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  return ({
    makeFetch,
    errors,
    isLoading,
  });
}

export default useFetch;
