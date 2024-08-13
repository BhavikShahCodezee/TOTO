import { useState } from 'react';

export const useForm = <T extends {}>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return {
    form,
    handleChange,
    setForm
  };
};
