import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserData } from './getUserData';
import { useAuth } from './AuthContext';

interface UserContextType {
    userData: any;
    loading: boolean;
    updateUserData: (data: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const data = await getUserData(currentUser.uid);
                setUserData(data);
            } else {
                setUserData(null);
            }
            setLoading(false);
        };

        fetchUserData();
    }, [currentUser]);

    const updateUserData = (data: any) => {
        setUserData(data);
    };

    return (
        <UserContext.Provider value={{ userData, loading, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser precisa ser usado com o UserProvider');
    }
    return context;
};
