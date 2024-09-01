import { useState, useEffect } from 'react';
import styles from './RateMedia.module.scss';
import Stars from './Stars';
import classNames from 'classnames';
import { IMedia } from 'types/IMedia';
import { useUser } from 'contexts/UserContext';
import { useAuth } from 'contexts/AuthContext';
import { updateUserRate } from 'services/userService';

interface RateMediaProps {
    mediaData: IMedia;
}

export default function RateMedia({ mediaData }: RateMediaProps) {
    const [rate, setRate] = useState(-1);
    const [desc, setDesc] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { userData } = useUser();
    const { currentUser } = useAuth();

    const handleSubmit = async () => {
        if(!currentUser) return;

        const avaliacoes = userData.avaliacoes || [];

        const updatedRate = [
            ...avaliacoes,
            {
                rate: rate,
                desc: desc,
                mediaId: mediaData.id
            }
        ]

        const success = await updateUserRate(currentUser.uid, updatedRate);

        if(success) {
            alert('Avaliação salva com sucesso!');
            return setIsOpen(false);
        } 

        return alert('Erro ao salvar avaliação! Tente novamente!');
    }

    useEffect(() => {
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
