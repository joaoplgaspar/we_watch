import { useAuth } from 'contexts/AuthContext';
import styles from './ListOption.module.scss'
import { useUser } from 'contexts/UserContext';
import { removeFromUserList } from 'services/userService';
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from 'react';
import classNames from 'classnames';
import BtnBack from 'components/BtnBack';
import DefaultButton from 'components/DefaultButton';

interface ListOptionProps {
    listName: string;
    itensInList: number;
    listType: string;
    list: any;
}

export default function ListOption({ listName, itensInList, listType, list }: ListOptionProps) {
  const { currentUser } = useAuth();
  const { userData, updateUserData } = useUser();
  const [isExcluding, setIsExcluding] = useState(false);

  const handleRemove = async () => {
      if (!currentUser) return;
      const success = await removeFromUserList(currentUser.uid, list);
      
      if (success) {
          updateUserData({ ...userData, minhasListas: userData.minhasListas.filter((item: any) => item.name !== list.name) });
          alert('Lista removida com sucesso');
      } else {
          alert('Erro ao remover a lista');
      }
  }

  return (
    <div className={styles.container}>
        <div className={styles.heading}>
            <h3 className={styles.title}>{listName}</h3>
            <p className={styles.type}>{listType}</p>
        </div>
        <div className={styles.footer}>
          <span className={styles.count}>{itensInList}</span>
          <FaRegTrashAlt onClick={() => setIsExcluding(true)} className={styles.icon__exclude}/>
        </div>

        <div className={classNames({
          [styles.exclude__container]: true,
          [styles.exclude__open]: isExcluding
        })}>
          <p>Tem certeza que deseja excluir a lista?</p>
          <DefaultButton handle={handleRemove}>Sim</DefaultButton>
          <BtnBack setOpen={setIsExcluding}/>
        </div>
    </div>
  )
}
