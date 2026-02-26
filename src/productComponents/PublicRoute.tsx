import { Navigate } from "react-router-dom";
import { useCartSelector } from "../redux/hooks";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const isAuthenticated = useCartSelector(
    (state) => state.auth.isAuthenticated
  );

  const token = localStorage.getItem("token");

  if (isAuthenticated || token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}