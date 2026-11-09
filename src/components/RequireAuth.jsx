import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

// Wraps every page that needs an account (shop, checkout, profile…).
// Not signed in? Go to /signin, and remember where you were headed
// so sign-in can bring you straight back.
export default function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }
  return <Outlet />;
}
