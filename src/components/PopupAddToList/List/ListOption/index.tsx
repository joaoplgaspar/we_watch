import styles from './ListOption.module.scss'

interface ListOptionProps {
    listName: string;
    itensInList: number;
    listType: string;
}

export default function ListOption({ listName, itensInList, listType }: ListOptionProps) {
  return (
    <div className={styles.container}>
        <div className={styles.heading}>
            <h3 className={styles.title}>{listName}</h3>
            <p className={styles.type}>{listType}</p>
        </div>
        <span className={styles.count}>{itensInList}</span>
    </div>
  )
}
