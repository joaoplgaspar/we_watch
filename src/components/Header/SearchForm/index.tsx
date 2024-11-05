import styles from './SearchForm.module.scss';
import { CiSearch } from "react-icons/ci";

export default function SearchForm() {
  return (
    <form className={styles.search_form}>
        <label className={styles.label_form}>
            <input type="text" placeholder="Buscar"/>
            <CiSearch className={styles.icon}/>
        </label>
    </form>
  )
}
