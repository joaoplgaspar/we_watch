import { usePopup } from 'contexts/AddListContext';
import { IoAddSharp } from "react-icons/io5";
import styles from './BtnAddToList.module.scss'
import classNames from 'classnames';

interface BtnAddToListProps { 
    large?: boolean;
}

export default function BtnAddToList({large}: BtnAddToListProps) {
    const { openPopup } = usePopup();

    const handleClick = () => {
        const newData = { message: 'Novas informações' };
        openPopup(newData);
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
