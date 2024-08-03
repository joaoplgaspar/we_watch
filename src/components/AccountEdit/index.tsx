import { useEffect, useState } from 'react';
import styles from './AccountEdit.module.scss';
import { IoMdPerson, IoMdClose } from "react-icons/io";
import { useAuth } from 'services/AuthContext';
import { useUser } from 'services/UserContext';
import Input from 'components/Input';
import ButtonSubmit from 'components/ButtonSubmit';
import classNames from 'classnames';
import avatares from 'json/avatar.json';
import ImagePicker from './ImagePicker';
import useFirebase from 'hooks/useFirebase';

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export default function AccountEdit({ visible, setVisible }: Props) {
    const { currentUser } = useAuth();
    const { userData, loading, updateUserData } = useUser();
    const { doc, setDoc, db } = useFirebase();

    const [avatar, setAvatar] = useState<string | null>('');
    const [name, setName] = useState<string>('');
    const [avatarPicker, setAvatarPicker] = useState<boolean>(false);

    useEffect(() => {
        if (!loading && userData) {
            setAvatar(userData.avatar || '');
            setName(userData.name || '');
        }
    }, [userData, loading]);

    function changeAvatar(avatar: string) {
        setAvatar(avatar);
        setAvatarPicker(false);
    }

    async function handleEditAccount() {
        try {
            if (currentUser) {
                const updatedUserData = {
                    ...userData,
                    name: name,
                    avatar: avatar,
                };
                await setDoc(doc(db, 'users', currentUser.uid), updatedUserData, { merge: true });
                updateUserData(updatedUserData);
                alert('Dados atualizados com sucesso');
                setVisible(false);
            }
        } catch (error) {
            console.error('Erro ao atualizar os dados do usuário', error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className={classNames({
            [styles.container]: true,
            [styles.container__visible]: visible
        })}>
            <div className={styles.account_edit__content}>
                <div 
                    className={styles.image_picker_btn}
                    onClick={() => setAvatarPicker(!avatarPicker)}
                >
                    {avatar ? <img src={`assets/images/avatar/${avatar}`} alt="Avatar para o seu perfil" /> : <IoMdPerson />}
                </div>
                <ImagePicker 
                    avatarPicker={avatarPicker}
                    setAvatarPicker={setAvatarPicker} 
                    changeAvatar={changeAvatar} 
                    avatares={avatares} 
                    styles={styles}
                />
                <div className={classNames({
                    [styles.form_inputs]: true,
                    [styles.form_inputs__visible]: avatarPicker
                })}>
                    <Input label="Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nome'/>
                    <ButtonSubmit onClick={handleEditAccount}>Salvar Alterações</ButtonSubmit>
                </div>
                <div className={styles.close}>
                    <IoMdClose onClick={() => setVisible(false)}/>
                </div>
            </div>
        </section>
    );
}