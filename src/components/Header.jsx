import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { UserContext } from "../store/UserContext";
import { GeolocationContext } from "../store/geolocationContext";
import { formatPathName } from "../utils/utils";

import Navigation from "./Navigation";

import "../styles/components/Header.scss";

// COMPONENT FUNCTION
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const { setGeolocation, setAlreadyFetched } = useContext(GeolocationContext);

  // DERIVED STATE
  let pageName;

  if (location.pathname === "/") {
    pageName = "Home";
  } else {
    pageName = formatPathName(location.pathname);
  }

  // FUNCTION
  function handleLogout() {
    setLoggedUser(null);
    setGeolocation(null);
    setAlreadyFetched(false);
    navigate("/login");
  }

  // JSX
  return (
    <div className="header">
      <h1 className="header__title">{pageName}</h1>
      {loggedUser && (
        <div className="header__user">
          <p className="header__user-name">{loggedUser.name}</p>
          <button className="header__btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <Navigation />
    </div>
  );
}
