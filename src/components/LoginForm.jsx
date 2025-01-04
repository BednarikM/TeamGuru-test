import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../store/UserContext";
import { isNotEmpty, hasMinLength } from "../utils/utils";

import useCustomInput from "../hooks/useCustomInput";
import CustomInput from "./CustomInput";

import "../styles/components/LoginForm.scss";

// COMPONENT FUNCTION
export default function LoginForm() {
  const navigate = useNavigate();

  const { validateUser, validationError, setValidationError } =
    useContext(UserContext);

  // HOOKS - CONTROLLED INPUTS
  const {
    value: usernameValue,
    handleInputChange: handleUsernameChange,
    handleInputBlur: handleUsernameBlur,
    hasError: usernameHasError,
    handleInputReset: handleUsernameReset,
  } = useCustomInput(
    "",
    (value) => isNotEmpty(value) && hasMinLength(value, 5),
    setValidationError
  );

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
    handleInputReset: handlePasswordReset,
  } = useCustomInput(
    "",
    (value) => isNotEmpty(value) && hasMinLength(value, 5),
    setValidationError
  );

  // FUNCTION
  function handleFormReset() {
    handleUsernameReset();
    handlePasswordReset();
    setValidationError(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = validateUser(usernameValue, passwordValue);

    if (result) {
      navigate("/user-detail");
    } else {
      return;
    }
  }

  // JSX
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__fields">
        <CustomInput
          label="Username"
          id="username"
          type="username"
          name="username"
          onBlur={handleUsernameBlur}
          onChange={handleUsernameChange}
          value={usernameValue}
          error={usernameHasError && "Please enter a valid username"}
        />
        <CustomInput
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password"}
        />
      </div>

      {validationError && (
        <div className="login-form__submit-error">
          <p>{validationError}</p>
        </div>
      )}

      <p className="login-form__actions">
        <button
          className="login-form__btn login-form__btn--reset"
          type="button"
          onClick={handleFormReset}
        >
          Reset
        </button>
        <button className="login-form__btn" onClick={handleSubmit}>
          Login
        </button>
      </p>
    </form>
  );
}
