import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context";

export default function ProtectedRoute() {
  const { user } = useContext(UserContext);

  if (user.loading) return <div>Loading...</div>;

  return user.data ? <Outlet /> : <Navigate to="/" />;
}
