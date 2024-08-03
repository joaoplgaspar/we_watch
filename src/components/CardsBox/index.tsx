import styles from './CardsBox.module.scss'

export default function CardsBox({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.card_box}>
      {children}
    </div>
  )
}
