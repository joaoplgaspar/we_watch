import React, { createContext, useContext, useState} from 'react'
import { IMedia } from 'types/IMedia';

interface MediaExtendContextType {
    isOpen: boolean;
    mediaData: IMedia;
    openMedia: (data: any) => void;
    closeMedia: () => void;
}

const MediaExtendContext = createContext<MediaExtendContextType | undefined>(undefined);

export default function MediaExtendProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mediaData, setMediaData] = useState<any>(null);

    const openMedia = (data: any) => {
        setMediaData(data);
        setIsOpen(true);
    };

    const closeMedia = () => {
        setIsOpen(false);
    };

    return (
        <MediaExtendContext.Provider value={{ isOpen, mediaData, openMedia, closeMedia }}>
            {children}
        </MediaExtendContext.Provider>
    );
}

export const useMediaExtend = () => {
    const context = useContext(MediaExtendContext);
    if (context === undefined) {
        throw new Error('useMediaExtend precisa ser usado com o MediaExtendProvider');
    }
    return context;
};