import React, { useState } from 'react';
import { auth, db } from 'services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AccessSection from 'components/AccessSection';
import AccessForm from 'components/AccessForm';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert('As senhas não coincidem');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        name: '',
        email,
        avatar: '',
      });
      
      navigate('/account?edit');
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <AccessSection>
      <AccessForm
        register
        action={handleSignUp}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        error={error}
      />
    </AccessSection>
  );
}