import styles from './DefaultButton.module.scss';

interface DefaultButtonProps {
    children: string;
    handle: any;
}

export default function DefaultButton({children, handle}: DefaultButtonProps) {
  return (
    <button onClick={() => handle()} className={styles.btn}>
        {children}
    </button>
  )
}
