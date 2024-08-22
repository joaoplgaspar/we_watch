import React from 'react'
import styles from './AccessSection.module.scss'

export default function AccessSection({children}: {children: React.ReactNode}) {
  return (
    <section className={styles.container}>
        {children}
    </section>
  )
}
