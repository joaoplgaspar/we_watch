import React from 'react'
import { Link } from 'react-router-dom'

export default function NavItems() {
  return (
    <>
        <li>
            <Link to="/">
                Explorar
            </Link>
        </li>
        <li>
            <Link to="/search">
                Minhas Listas
            </Link>
        </li>
        <li>
            <Link to="/menu">
                Conexões
            </Link>
        </li>
    </>
  )
}
