import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/User.api";
import { login, logout } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
    try {

        const { queryClient, store } = context;
        const user = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
        });

        if (!user || !user.data) {
            store.dispatch(logout());
            return false;
        }

        store.dispatch(login(user.data.user));
        const { isAuthenticated } = store.getState().auth;

        if (!isAuthenticated) return false;

        return true

    } catch (error) {
        console.log(error)
        context.store.dispatch(logout());
        return redirect({ to: "/auth", });
    }
};

export const checkAuthSilent = async ({ context }) => {
    try {
        const { queryClient, store } = context;
        const user = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
        });

        if (user && user.data) {
            store.dispatch(login(user.data.user));
        } else {
            store.dispatch(logout());
        }
    } catch (error) {
        // Silently fail - user is not authenticated
        console.log("User not authenticated");
        context.store.dispatch(logout());
    }
};
