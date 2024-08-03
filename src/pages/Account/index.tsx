import AccountEdit from 'components/AccountEdit';
import Logout from 'components/Logout';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Account.module.scss';
import { useUser } from 'services/UserContext';

export default function AccountPage() {
  const { userData, loading } = useUser();

  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') !== null;
  const [visible, setVisible] = useState<boolean>(isEditMode);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AccountEdit visible={visible} setVisible={setVisible}/>
      <main className={styles.container}>
        <h1 className={styles.title}>Sua Conta</h1>
        {userData ? (
          <div className={styles.account__content}>
            <div className={styles.image__container} onClick={() => setVisible(true)}>
              <img src={`assets/images/avatar/${userData.avatar}`} alt="User Avatar" />
            </div>
            <p>Usuário: {userData.name}</p>
            <p>Email da conta: {userData.email}</p>
          </div>
        ) : (
          <h2>Loading user data...</h2>
        )}

        <Logout />
      </main>
    </>
  );
};
