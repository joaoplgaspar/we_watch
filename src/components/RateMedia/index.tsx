import { useState, useEffect } from 'react';
import styles from './RateMedia.module.scss';
import Stars from './Stars';
import classNames from 'classnames';
import { IMedia } from 'types/Media';

interface RateMediaProps {
    mediaData: IMedia;
}

export default function RateMedia({ mediaData }: RateMediaProps) {
    const [rate, setRate] = useState(-1);
    const [desc, setDesc] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        // Resetar rate e desc ao mudar mediaData
        setRate(-1);
        setDesc('');
        setIsOpen(false);
    }, [mediaData]);

    return (
        <div className={styles.container}>
            <h3 className={styles.title} onClick={() => setIsOpen(!isOpen)}>Avalie!</h3>
            <div className={classNames({
                [styles.content]: true,
                [styles.content__open]: isOpen
            })}>
                {/* AJUSTAR CODIGO: colocar aria labels */}
                <textarea 
                    onChange={(e) => setDesc(e.target.value)} 
                    value={desc} 
                    className={styles.textarea}
                    placeholder='Salve sua opinião!' 
                /> 
                <Stars rate={rate} setRate={setRate} />
                <button 
                    className={styles.btn}
                    onClick={() => handleSubmit()}
                >
                    Salvar
                </button>
            </div>
        </div>
    );
}
