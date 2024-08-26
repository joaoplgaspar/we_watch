import classNames from 'classnames';
import styles from './Stars.module.scss'
import { ReactComponent as Star } from './star.svg';

interface StarsProps {
    rate: number;
    setRate: React.Dispatch<React.SetStateAction<number>>;
}

export default function Stars({ rate, setRate }: StarsProps) {
    const stars = 5;

    const handleClick = (index: number) => {
        if(index === rate) return setRate(-1);
        setRate(index)
    }

    return (
        <div className={styles.stars__container}>
            {Array.from({length: stars}).map((_, index) => (
                <div key={index} className={styles.star} onClick={() => handleClick(index)}>
                    <Star className={classNames({
                        [styles.star__icon]: true,
                        [styles.star__icon__active]: index <= rate
                    })}/>
                </div>
            ))}
        </div>
    )
}
