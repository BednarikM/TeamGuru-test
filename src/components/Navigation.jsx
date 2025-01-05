import { useMemo, useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../store/UserContext";

import "../styles/components/Navigation.scss";

// CONSTANT
let NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Login", path: "login" },
];

// COMPONENT FUNCTION
export default function Navigation() {
  const { loggedUser } = useContext(UserContext);

  // DERIVED STATE
  const navLinks = useMemo(() => {
    if (loggedUser) {
      return [
        ...NAV_LINKS.filter((link) => link.name !== "Login"),
        { name: "User detail", path: "/user-detail" },
      ];
    }
    return NAV_LINKS;
  }, [loggedUser]);

  // JSX
  return (
    <ul className="navigation">
      {navLinks.map((link) => (
        <li key={link.name} className="navigation__item">
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              isActive ? "navigation__item--active" : undefined
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
