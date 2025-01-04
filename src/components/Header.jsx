import { useContext, useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { UserContext } from "../store/UserContext";
import { GeolocationContext } from "../store/geolocationContext";
import { formatPathName } from "../utils/utils";

import "../styles/components/Header.scss";

// CONSTANTS
let NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Login", path: "login" },
];

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

  const navLinks = useMemo(() => {
    if (loggedUser) {
      return [
        ...NAV_LINKS.filter((link) => link.name !== "Login"),
        { name: "User detail", path: "/user-detail" },
      ];
    }
    return NAV_LINKS;
  }, [loggedUser]);

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
      <ul className="header__navlink-list">
        {navLinks.map((link) => (
          <li key={link.name} className="header__navlink-item">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? "header__navlink-item--active" : undefined
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
