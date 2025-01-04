import { createContext, useState } from "react";

export const GeolocationContext = createContext({
  geolocation: {},
  setGeolocation: () => {},
});

export function GeolocationProvider({ children }) {
  const [geolocation, setGeolocation] = useState(null);
  const [geolocationError, setGeolocationError] = useState(null);
  const [alreadyFetched, setAlreadyFetched] = useState(false);

  return (
    <GeolocationContext.Provider
      value={{
        geolocation,
        setGeolocation,
        alreadyFetched,
        setAlreadyFetched,
        geolocationError,
        setGeolocationError,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
}
