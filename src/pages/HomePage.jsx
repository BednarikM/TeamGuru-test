import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../store/UserContext";

// COMPONENT FUNCTION
export default function HomePage() {
  const { loggedUser } = useContext(UserContext);

  return (
    <div className="welcome">
      {!loggedUser && (
        <>
          <p className="welcome__message welcome__message--unlogged ">
            Welcome to my test project.
          </p>
          <p className="welcome__message welcome__message--unlogged">
            To proceed redirect to the Login page please.
          </p>

          <Link to="login" className="welcome__login-btn">
            Login
          </Link>
        </>
      )}
      {loggedUser && (
        <p className="welcome__message welcome__message--logged ">
          {`You are logged in message :)`}
        </p>
      )}
    </div>
  );
}
