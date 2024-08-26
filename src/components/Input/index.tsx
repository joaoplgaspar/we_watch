import React from 'react'
import styles from './Input.module.scss'

interface Props {
    label?: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    required?: boolean
}

export default function Input({type, value, onChange, placeholder, required, label}: Props) {
  return (
    <div className={styles.field}>
        {label && <label htmlFor={placeholder}>{label}</label>}
        <input 
          type={type} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder} 
          required={required} 
          className={styles.access_input} 
          id={placeholder} 
          name={type}
        />
    </div>
  )
}
