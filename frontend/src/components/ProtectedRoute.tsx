import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Outlet, Navigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";

export const ProtectedRoute = () => {
    const { loading } = useGetUser();

    // Access the user state from Redux store
    const user = useSelector((state: RootState) => state.user);
    if (loading) return <p>Loading...</p>;

    // If user is not logged in, redirect to home page
    return user.id ? <Outlet /> : <Navigate to="/" replace />;
};
