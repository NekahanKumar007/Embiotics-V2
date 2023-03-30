import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    let user
    if (localStorage.getItem("profile") === null) {
         user = { loggedIn: false };
      }else{
        user = { loggedIn: true };
      }
 
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;