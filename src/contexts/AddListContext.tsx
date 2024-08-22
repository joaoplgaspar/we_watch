import React, { createContext, useContext, useState } from 'react';

interface PopupContextType {
    isOpen: boolean;
    popupData: any;
    openPopup: (data: any) => void;
    closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);


export function PopupProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [popupData, setPopupData] = useState<any>(null);

    const openPopup = (data: any) => {
        setPopupData(data);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <PopupContext.Provider value={{ isOpen, popupData, openPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (context === undefined) {
        throw new Error('usePopup precisa ser usado com o PopupProvider');
    }
    return context;
};
