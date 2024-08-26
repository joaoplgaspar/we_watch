import classNames from 'classnames';
import styles from './NewListPopup.module.scss';
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { useAuth } from 'contexts/AuthContext';
import { useUser } from 'contexts/UserContext';
import { addUserList } from 'services/userService';
import { useState } from 'react';

interface NewListPopupProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    handleClose: () => void;
}

export default function NewListPopup({ open, setOpen, handleClose }: NewListPopupProps) {
    const { currentUser } = useAuth();
    const { userData, updateUserData } = useUser();
    const [ listName, setListName ] = useState<string>('');
    const [ listType, setListType ] = useState<string>('private');

    const handleSubmit = async () => {
        if (!currentUser) return;

        const newList = {
            name: listName,
            privacidade: listType,
            midias: [],
            dataCriacao: new Date(),
        };

        const success = await addUserList(currentUser.uid, [...userData.minhasListas, newList]);
        
        if (success) {
            updateUserData({ ...userData, minhasListas: [...userData.minhasListas, newList] });
            setOpen(false);
            alert('Dados atualizados com sucesso');
        } else {
            alert('Erro ao atualizar os dados');
        }
    }

    return (
        <div className={classNames({
            [styles.container]: true,
            [styles.open]: open
        })}>
            <div className={styles.heading}>
                <div className={styles.heading__left}>
                    <IoMdArrowRoundBack className={styles.back__icon} onClick={() => setOpen(false)} aria-label="Voltar"/>
                    <h3 className={styles.title}>Criar nova lista</h3>
                </div>
                <IoMdClose onClick={() => handleClose()} className={styles.close__icon} aria-label="Fechar"/>
            </div>
            <div className={styles.content}>
                <input 
                    type="text" 
                    placeholder="Nome da lista" 
                    className={styles.input_text}
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    aria-label="Nome da lista"
                />
                <div className={styles.field}>
                    <input 
                        type="radio" 
                        id="private" 
                        name="list_type" 
                        value="private" 
                        checked={listType === 'Privada'}
                        onChange={() => setListType('Privada')}
                        aria-label="Privada"
                    />
                    <label htmlFor="private">Privada</label>
                </div>
                <div className={styles.field}>
                    <input 
                        type="radio" 
                        id="compartilhada" 
                        name="list_type" 
                        value="Compartilhada" 
                        checked={listType === 'Compartilhada'}
                        onChange={() => setListType('Compartilhada')}
                        aria-label="Compartilhada"
                    />
                    <label htmlFor="compartilhada">Compartilhada</label>
                </div>
                <button onClick={() => handleSubmit()} aria-label="Criar lista">Criar</button>
            </div>
        </div>
    );
}