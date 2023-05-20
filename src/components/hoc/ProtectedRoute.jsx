import { Navigate, useLocation } from "react-router-dom";

// Защищаем роут
const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
