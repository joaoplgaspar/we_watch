import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from 'services/firebaseConfig';
import { signOut } from 'firebase/auth';
import styles from './Logout.module.scss'

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return <button className={styles.btn} onClick={handleLogout}>Logout</button>;
};

export default Logout;