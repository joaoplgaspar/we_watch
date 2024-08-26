import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './BtnBack.module.scss'

export default function BtnBack({setOpen}: {setOpen: (value: boolean) => void}) {
  return (
    <IoMdArrowRoundBack className={styles.back__icon} onClick={() => setOpen(false)} aria-label="Voltar"/>
  )
}
