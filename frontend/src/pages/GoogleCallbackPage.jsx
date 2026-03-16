import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { DotLoader } from 'react-spinners';

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    // This page is loaded after successful Google auth
    // The backend sets the cookie, so we need to verify the user
    const verifyAuth = async () => {
      try {
        // Make a request to get current user info
        const response = await fetch(`${backendUrl}/api/auth/me`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          dispatch(login(data.data.user));
          navigate({ to: '/dashboard' });
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Google auth callback error:', error);
        navigate({ to: '/auth' });
      }
    };

    verifyAuth();
  }, [navigate, dispatch, backendUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="text-center">
        <DotLoader color="#4F46E5" size={60} />
        <p className="mt-6 text-lg text-gray-600 font-semibold">
          Completing authentication...
        </p>
      </div>
    </div>
  );
};

export default GoogleCallbackPage;
