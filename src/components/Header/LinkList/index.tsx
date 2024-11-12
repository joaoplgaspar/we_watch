import { Link } from 'react-router-dom'
import styles from '../Header.module.scss'
import { IoMdMenu } from 'react-icons/io'
import classNames from 'classnames'

interface LinkListProps {
    links: { to: string, text: string }[]
    menuOpen: boolean
    setMenuOpen: (open: boolean) => void
}

export default function LinkList({ links, setMenuOpen, menuOpen }: LinkListProps) {
  return (
    <div className={styles.header__list_container}>
      <IoMdMenu 
        className={styles.icon_menu}
        onClick={() => setMenuOpen(!menuOpen)}
      />

      <ul className={classNames({
        [styles.header__list]: true,
        [styles.header__list__open]: menuOpen
      })}>
        {links.map((link, index) => (
            <li key={index}>
                <Link to={link.to} className={styles.header_list_item}>{link.text}</Link>
                <div className={styles.line} />
            </li>
        ))}
      </ul>
    </div>
  )
}
