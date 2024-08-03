import React from 'react'
import styles from './ButtonSubmit.module.scss'

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
}

export default function ButtonSubmit({children, onClick}: Props) {
  return (
    <button type="submit" className={styles.btn_submit} onClick={onClick}>{children}</button>
  )
}
