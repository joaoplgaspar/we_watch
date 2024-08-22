import styles from './CardsBox.module.scss'

interface CardsBoxProps {
  children: React.ReactNode
}

export default function CardsBox({children}: CardsBoxProps) {
  return (
    <div className={styles.card_box}>
      {children}
    </div>
  )
}
