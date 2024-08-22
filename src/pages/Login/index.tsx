import React, { useState } from 'react';
import { auth } from 'services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AccessSection from 'components/AccessSection';
import AccessForm from 'components/AccessForm';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <AccessSection>
      <AccessForm
        login
        action={handleSignUp}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
      />
    </AccessSection>
  );
}