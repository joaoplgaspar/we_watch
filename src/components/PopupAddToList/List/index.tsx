import { IoMdClose } from 'react-icons/io'
import ListOption from './ListOption'
import styles from './List.module.scss'
import classNames from 'classnames';

interface ListProps {
  handleClose: () => void;
    open: boolean;
    setNewListDisplay: (value: boolean) => void;
    lists: any;
}

export default function List({ handleClose, open, setNewListDisplay, lists }: ListProps) {
  return (
    <div className={classNames({
      [styles.container]: true,
      [styles.open]: open
    })}>
        <div className={styles.heading}>
            <h3 className={styles.title}>Selecione uma lista</h3>
            <IoMdClose onClick={() => handleClose()} className={styles.close__icon}/>
        </div>
        {lists?.map((midia: any) => (
            <ListOption
                list={midia} 
                itensInList={midia.midias.length}
                listType={midia.privacidade}
                listName={midia.name}
                key={midia.name}
            />
        ))}
        <div className={styles.new_list}>
          <button onClick={() => setNewListDisplay(true)}>Criar nova lista</button>
        </div>
    </div>
  )
}
