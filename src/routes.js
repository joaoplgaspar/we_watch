import DefaultPage from 'components/DefaultPage';
import Home from 'pages/Home';
import Login from 'pages/Login';
import SignUp from 'pages/Register';
import Account from 'pages/Account';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from 'services/PrivateRoute';
import { AuthProvider } from 'contexts/AuthContext';
import { UserProvider } from 'contexts/UserContext';
import { PopupProvider } from 'contexts/AddListContext';
import MediaExtendProvider from 'contexts/MediaExtendContext';
import SharedList from 'pages/SharedList';
import Midia from 'pages/Midia';

export default function Router() {
  return (
    <BrowserRouter>
      <MediaExtendProvider>
        <AuthProvider>
          <UserProvider>
            <PopupProvider>
              <Routes>
                <Route path='/' element={<DefaultPage />}>
                  <Route index element={<Home />} />
                  <Route path='/register' element={<SignUp />} />
                  <Route path='/login' element={<Login />} />
                  <Route element={<PrivateRoute />}>
                    <Route path='/account' element={<Account />} />
                  </Route>
                  <Route path='/lista/:codigo'  element={<SharedList />} />
                  <Route path='/:midia/:id' element={<Midia />} />
                </Route>
              </Routes>
            </PopupProvider>
          </UserProvider>
        </AuthProvider>
      </MediaExtendProvider>
    </BrowserRouter>
  );
}
