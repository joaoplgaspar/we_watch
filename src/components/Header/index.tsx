import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import SearchBar from './SearchBar'
import LinkList from './LinkList'
import ProfileAccess from './ProfileAccess'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [headerScroll, setHeaderScroll] = useState(false)
  const [headerBackground, setHeaderBackground] = useState(false)
  let lastScroll = window.scrollY

  useEffect(() => {
    if (menuOpen) setSearchOpen(false)
  }, [menuOpen])

  useEffect(() => {
    if (searchOpen) setMenuOpen(false)
  }, [searchOpen])

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      setHeaderBackground(true)
    } else {
      setHeaderBackground(false)
    }

    if(lastScroll < window.scrollY) {
      setHeaderScroll(true)
      setSearchOpen(false)
      setMenuOpen(false)
    } else {
      setHeaderScroll(false)
    }

    lastScroll = window.scrollY
  })

  const links = [
    { to: '/play', text: 'Play' },
    { to: '/midias', text: 'Midias' },
    { to: '/lists', text: 'Listas' },
    { to: '/about', text: 'Sobre' },
  ]

  return (
    <header className={classNames({
      [styles.header]: true,
      [styles.header__background]: headerBackground,
      [styles.header__scroll]: headerScroll
    })}>
      <div className={styles.header__content}>
        <Link to="/" className={styles.header__title}>
          <h1>We Watch</h1>
        </Link>

        <nav className={styles.header__nav}>
          <LinkList links={links} 
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
          <SearchBar
            openSearch={searchOpen}
            setOpenSearch={setSearchOpen}
          />
          <ProfileAccess />
        </nav>
      </div>
    </header>
  )
}
