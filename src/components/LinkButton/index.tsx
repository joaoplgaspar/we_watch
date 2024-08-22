import { Link } from 'react-router-dom';
import styles from './LinkButton.module.scss';

interface LinkButtonProps {
    to: string;
    children: string;
}

export default function LinkButton({ to, children }: LinkButtonProps) {
    return (
        <Link to={to} className={styles.link_button}>
            {children}
        </Link>
    )
}