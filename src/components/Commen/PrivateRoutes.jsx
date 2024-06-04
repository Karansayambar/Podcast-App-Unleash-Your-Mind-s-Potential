import { Navigate, Outlet } from "react-router-dom";
import Loading from "../../Loading";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return < Loading type={"spin"} color={"grey"} />;
  } else if (!user || error) {
    return <Navigate to={"/"} replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;

