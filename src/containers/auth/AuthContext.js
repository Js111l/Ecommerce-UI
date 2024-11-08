import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children, sessionChecked}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const authService = new AuthService()

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };
  
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {sessionChecked ? children : null}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
