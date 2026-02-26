import { Navigate } from "react-router-dom";
import { User } from "../../Data/User";

const ProtectedRoute = ({ children, allowedRoles }) => {
    // If user is not logged in (mock check: if role is missing)
    if (!User.role) {
        return <Navigate to="/" replace />;
    }

    // If roles are specified, check if user has permission
    if (allowedRoles && !allowedRoles.includes(User.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
