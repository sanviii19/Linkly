import React, { useState, useEffect } from 'react'
import { useSearch, useNavigate } from '@tanstack/react-router'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
    const search = useSearch({ from: '/auth' });
    const navigate = useNavigate();
    const [login, setLogin] = useState(search.mode === 'login');

    useEffect(() => {
      setLogin(search.mode === 'login');
    }, [search.mode]);

    const toggleForm = (isLogin) => {
      setLogin(isLogin);
      navigate({ 
        to: '/auth', 
        search: { mode: isLogin ? 'login' : 'register' } 
      });
    };

  return (
    <div>
        {login ? (
          <LoginForm onToggleForm={() => toggleForm(false)} />
        ) : (
          <RegisterForm onToggleForm={() => toggleForm(true)} />
        )}
    </div>
  )
}

export default AuthPage;