import { useState } from 'react';

function useFetch() {
  const [errors, setErrors] = useState(null);

  const makeFetch = async (url) => {
    const response = await fetch(url);

    try {
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
    }
  };

  return ({
    makeFetch,
    errors,
  });
}

export default useFetch;
