import { useSelector } from "react-redux";
import { TRootState } from "../../../store/store";
import { Navigate } from "react-router-dom";

type RouteGuardProps = {
  children: React.ReactNode;
  bizOnly?: boolean;
  adminOnly?: boolean;
};
// This component is used to protect routes based on user roles (business or admin)
const RouteGuard = (props: RouteGuardProps) => {
  const { children, bizOnly, adminOnly } = props;

  const user = useSelector((state: TRootState) => {
    return state.userSlice.user;
  }); //get user from slice store

  if (!user) {
    return <Navigate to="/login" />;
  } else if (bizOnly && !user.isBusiness) {
    return <Navigate to="/home" />;
  } else if (adminOnly && !user.isAdmin) {
    return <Navigate to="/home" />;
  }
  return <>{children}</>;
};

export default RouteGuard;
