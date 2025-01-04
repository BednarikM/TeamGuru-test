import { createContext, useState } from "react";

// CONSTANTS
import USERS from "../usersDB";

// CONTEXT
export const UserContext = createContext({
  googleApiKey: "",
  googleBaseUrl: "",
  loggedUser: {},
  setLoggedUser: () => {},
  validateUser: () => {},
  validationError: {},
  setValidationError: () => {},
});

// PROVIDER
export function UserContextProvider({ children }) {
  const [validationError, setValidationError] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);

  const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const googleBaseUrl = import.meta.env.VITE_GOOGLE_BASE_URL;

  function validateUser(givenLogin, givenPassword) {
    const result = USERS.find(
      (user) => givenLogin === user.login && givenPassword === user.password
    );

    if (result) {
      setLoggedUser(result);
      return true;
    } else {
      setValidationError("Username or password is incorrect");
      return false;
    }
  }

  return (
    <UserContext.Provider
      value={{
        googleApiKey,
        googleBaseUrl,
        loggedUser,
        setLoggedUser,
        validateUser,
        validationError,
        setValidationError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
