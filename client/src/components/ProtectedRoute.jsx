import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, adminOnly = false }) => {
    const { user, loading } = useAuth();
    const isCheckAdmin = requireAdmin || adminOnly;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F6F4EE] text-[#1C1B17] font-semibold text-xs">
                Loading Jaza Trading Portal...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    if (isCheckAdmin && !user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
