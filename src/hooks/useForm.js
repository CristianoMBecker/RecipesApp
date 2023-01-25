import { useState } from 'react';

function useForm(initialState) {
  const [value, setValue] = useState(initialState);

  const handleChange = ({ target }) => {
    setValue(target.value);
  };
  return ({
    value,
    handleChange,
  });
}

export default useForm;
