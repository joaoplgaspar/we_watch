import { usePopup } from 'contexts/AddListContext';
import { IoAddSharp } from "react-icons/io5";
import styles from './BtnAddToList.module.scss'
import classNames from 'classnames';

interface BtnAddToListProps { 
    large?: boolean;
    mediaId?: number;
}

export default function BtnAddToList({large, mediaId}: BtnAddToListProps) {
    const { openPopup } = usePopup();

    const handleClick = () => {
        openPopup(mediaId);
    };

    return (
        <button 
            onClick={handleClick}
            className={classNames({
                [styles.btn__container]: true,
                [styles.large]: large
            })}
        >
            <IoAddSharp />
        </button>
    )
}
