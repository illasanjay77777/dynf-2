import { useState, useEffect } from 'react';

const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting]); // Add 'isSubmitting' to the dependency array

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCheckboxChange = (name, isChecked) => {
    setValues({
      ...values,
      additionalSkills: {
        ...values.additionalSkills,
        [name]: isChecked,
      },
    });
  };

  return {
    values,
    handleChange,
    handleCheckboxChange,
    errors,
    isSubmitting,
    setErrors, // Add setErrors to return object
    setIsSubmitting // Add setIsSubmitting to return object
  };
};

export default useFormValidation;
