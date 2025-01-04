import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";

// COMPONENT FUNCTION
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { loggedUser } = useContext(UserContext);

  // HOOK
  useEffect(() => {
    if (!loggedUser) {
      navigate("/login", { replace: true });
    }
  }, [loggedUser, navigate]);

  if (!loggedUser) {
    return null;
  }

  return children;
}
