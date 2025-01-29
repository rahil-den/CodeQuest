// write  for token 
import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    let [token, setToken] = useState(localStorage.getItem('token'));
    // let [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    // let [userId, setUserId] = useState(localStorage.getItem('userId'));
    let navigate = useNavigate();



    let isLoggedIn = !!token;


    const storeTokenInLS = ({data}) => {
        console.log(data.token);
        setToken(data.token);
        // setUser(data.user);
        localStorage.setItem('token', data.token);
        // localStorage.setItem('user',
        //     JSON.stringify(data.user)
        // );
    }
    const logoutUser = () => {
        setToken("");
        // setUser("");
        localStorage.removeItem('token')
        // localStorage.removeItem('user')
        navigate('/login');
    }






    return <AuthContext.Provider value={{token, storeTokenInLS, logoutUser, isLoggedIn}}>
        {children}
    </AuthContext.Provider>
}
export const useAuth = () => {
    return useContext(AuthContext);
}