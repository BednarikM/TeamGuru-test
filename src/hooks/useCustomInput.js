import { useState, useCallback } from "react";

export default function useCustomInput(
  defaultValue,
  validationFn,
  resetSubmitError
) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [inputTouched, setInputTouched] = useState(false);

  const valueIsValid = validationFn(inputValue);

  const handleInputChange = useCallback(
    function handleInputChange(event) {
      setInputValue(event.target.value);
      setInputTouched(false);
      resetSubmitError(null);
    },
    [resetSubmitError]
  );

  const handleInputBlur = useCallback(function handleInputBlur() {
    setInputTouched(true);
  }, []);

  const handleInputReset = useCallback(function handleInputReset() {
    setInputValue("");
    setInputTouched(false);
  }, []);

  return {
    value: inputValue,
    handleInputChange,
    handleInputBlur,
    hasError: inputTouched && !valueIsValid,
    handleInputReset,
  };
}
