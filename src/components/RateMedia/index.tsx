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
    const { userData, updateUserData } = useUser();
    const { currentUser } = useAuth();

    const handleSubmit = async () => {
        if(!currentUser) return;
        let newList:[]

        const avaliacaoExists = userData.avaliacoes.find((a: any) => a.mediaId === mediaData?.id);

        if(avaliacaoExists) newList = userData.avaliacoes.filter((a: any) => a.mediaId !== mediaData?.id);
        else newList = userData.avaliacoes;

        const updatedRate = [
            ...newList,
            {
                rate: rate,
                desc: desc,
                mediaId: mediaData.id
            }
        ]

        const success = await updateUserRate(currentUser.uid, updatedRate);

        if(success) {
            updateUserData({ ...userData, avaliacoes: updatedRate});
            alert('Avaliação salva com sucesso!');
            return setIsOpen(false);
        } 

        return alert('Erro ao salvar avaliação! Tente novamente!');
    }

    useEffect(() => {
        setRate(-1);
        setDesc('');
        setIsOpen(false);
        if(userData && Array.isArray(userData.avaliacoes)) {
            const avaliacao = userData.avaliacoes.find((a: any) => a.mediaId === mediaData?.id);
            if(avaliacao) {
                setRate(avaliacao.rate);
                setDesc(avaliacao.desc);
            }
        }
    }, [userData, mediaData]);

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
