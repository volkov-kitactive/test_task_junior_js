import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Защищаем роут
const ProtectedRoute = ({ element: Component, ...props }) => {
  const loggedIn = useSelector((state) => state.loggedIn)


  return loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
