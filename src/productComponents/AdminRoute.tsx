import { Navigate } from "react-router-dom";
import { useCartSelector } from "../redux/hooks";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AdminRoute({ children }: Props) {
  const { isAuthenticated, role } = useCartSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}