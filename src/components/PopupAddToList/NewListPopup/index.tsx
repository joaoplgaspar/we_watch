import classNames from 'classnames';
import styles from './NewListPopup.module.scss';
import { IoMdClose } from "react-icons/io";
import { useAuth } from 'contexts/AuthContext';
import { useUser } from 'contexts/UserContext';
import { addUserList, addSharedList } from 'services/userService'; // Importando a nova função
import { useState } from 'react';
import BtnBack from 'components/BtnBack';
import { v4 as uuidv4 } from 'uuid';  // Para gerar um código único

interface NewListPopupProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    handleClose: () => void;
}

export default function NewListPopup({ open, setOpen, handleClose }: NewListPopupProps) {
    const { currentUser } = useAuth();
    const { userData, updateUserData } = useUser();
    const [listName, setListName] = useState<string>('');
    const [listType, setListType] = useState<string>('private');

    const handleSubmit = async () => {
        if (!currentUser) return;
        if (listName === '') return alert('Nome da lista não pode ser vazio');
        
        const listExists = userData.minhasListas.find((list: any) => list.name === listName);
        if (listExists) return alert('Lista já existe');
    
        const sharedListCode = listType === 'Compartilhada' ? uuidv4() : null;  // Gera um código único se for uma lista compartilhada
    
        const newList = {
            name: listName,
            privacidade: listType,
            midias: [],
            dataCriacao: new Date(),
            codigo: sharedListCode,  // Adiciona o código da lista
            criador: currentUser.uid  // Adiciona o UID do criador
        };

        let success;
    
        if (listType === 'Compartilhada') {
            success = await addSharedList(newList);  // Chama a função para adicionar na coleção `listasCompartilhadas`
        } else {
            success = await addUserList(currentUser.uid, [...userData.minhasListas, newList]);  // Adiciona lista privada ao perfil do usuário
        }

        if (success) {
            updateUserData({ ...userData, minhasListas: [...userData.minhasListas, newList] });
            setListName('');
            setListType('private');
            setOpen(false);
            if (sharedListCode) {
                alert(`Lista compartilhada criada com sucesso! Código de compartilhamento: ${sharedListCode}`);
            } else {
                alert('Lista criada com sucesso!');
            }
        } else {
            alert('Erro ao atualizar os dados');
        }
    };

    return (
        <div className={classNames({
            [styles.container]: true,
            [styles.open]: open
        })}>
            <div className={styles.heading}>
                <div className={styles.heading__left}>
                    <BtnBack setOpen={setOpen}/>
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