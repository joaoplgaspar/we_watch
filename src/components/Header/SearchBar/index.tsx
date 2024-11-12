import styles from '../Header.module.scss'
import { FiSearch } from "react-icons/fi";
import classNames from 'classnames';

interface SearchBarProps { 
  openSearch: boolean
  setOpenSearch: (open: boolean) => void
}

export default function SearchBar({ openSearch, setOpenSearch }: SearchBarProps) {
  return (
    <div className={styles.header__search}>
      <FiSearch 
        className={styles.search_icon}
        onClick={() => setOpenSearch(!openSearch)}
      />

      <div className={classNames({
        [styles.search_input__container]: true,
        [styles.search_input__container__open]: openSearch
      })}>
        <input type="search" placeholder="Search" />
        <FiSearch className={styles.search_icon}/>
      </div>
    </div>
  )
}
