import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/slices/authSlice';

export const useAuth = () => {
    const token = useSelector((state) => state.auth.token);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    return {
        token,
        isAuthenticated,
        login: (token) => dispatch(login(token)),
        logout: () => dispatch(logout()),
    };
};
