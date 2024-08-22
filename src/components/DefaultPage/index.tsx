import ExtendsMedia from 'components/ExtendsMedia'
import Header from 'components/Header'
import PopupAddToList from 'components/PopupAddToList'
import { Outlet } from 'react-router-dom'

export default function DefaultPage() {
  return (
    <>
        <Header />
        <main>
            <Outlet />
        </main>
        <PopupAddToList/>
        <ExtendsMedia />
    </>
  )
}
