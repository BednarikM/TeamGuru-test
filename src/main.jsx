import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { UserContextProvider } from "./store/UserContext.jsx";
import { GeolocationProvider } from "./store/geolocationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <GeolocationProvider>
        <App />
      </GeolocationProvider>
    </UserContextProvider>
  </StrictMode>
);
