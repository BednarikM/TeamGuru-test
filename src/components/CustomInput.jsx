import { forwardRef } from "react";

import "../styles/components/CustomInput.scss";

// COMPONENT FUNCTION WITH FORWARDED REF (REACT 18)
const CustomInput = forwardRef(function CustomInput(
  { label, id, error, type = "text", ...props },
  ref
) {
  return (
    <div className="custom-input">
      <label className="custom-input__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="custom-input__element"
        type={type}
        id={id}
        ref={ref}
        {...props}
      />
      <div className="custom-input__error">{error && <p>{error}</p>}</div>
    </div>
  );
});

export default CustomInput;
