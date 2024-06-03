import { createContext, useEffect, useState } from 'react';
import { STORAGE_KEYS, getValue } from '../Storage';
import { toast } from 'react-toastify';
import { doGET } from '../../utils/HttpUtil';
import { ENDPOINTS } from '../api/constants';

export const AppContext = createContext("");

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const success = (message) => {
        return toast.success(message);
    };

    const error = (message) => {
        return toast.error(message)
    }


    const getCurrentUser = async (e) => {
        try {
            const response = await doGET(ENDPOINTS.profile);
            setUserData(response?.data)
        } catch (error) { }
    };

    const logout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        success("Logout Successfully")
    }

    useEffect(() => {
        const token = getValue(STORAGE_KEYS.TOKEN);
        if (token) {
            setIsLoggedIn(true);
            getCurrentUser()
        }
    }, [])

    return (
        <AppContext.Provider
            value={{
                userData,
                setUserData,
                success,
                error,
                isLoggedIn, setIsLoggedIn,
                logout
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
