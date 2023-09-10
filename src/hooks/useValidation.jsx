import { useCallback, useState } from "react";
import { isEmail } from "validator";

export const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    if (name === 'email') {
      const emailError = !isEmail(value) ? 'Неверный формат электронной почты' : '';
      evt.target.setCustomValidity(emailError);
      setErrors({ ...errors, [name]: emailError });
    }
    if (name === 'name') {
      const nameError =
        value.length < 2 || value.length > 30
          ? 'Имя должно содержать не меньше 2 и не больше 30 символов'
          : '';
      evt.target.setCustomValidity(nameError);
      setErrors({ ...errors, [name]: nameError });
    } else {
      setErrors({ ...errors, [name]: evt.target.validationMessage });
    }
    setIsValid(evt.target.closest('form').checkValidity());
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues, 'newValues');
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  return { values, handleChange, errors, isValid, resetForm, setValues };
};