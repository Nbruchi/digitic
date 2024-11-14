/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));

  return getTokenFromLocalStorage?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default PrivateRoutes;
