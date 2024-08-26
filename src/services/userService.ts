import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const addUserList = async (uid: string, newList: any) => {
  try {
    const userDocRef = doc(db, 'users', uid);

    await setDoc(userDocRef, { minhasListas: newList }, { merge: true });
  
    return true;
  } catch (error) {
    console.error('Erro ao adicionar lista do usuário', error);
    return false;
  }
};

export const updateUserProfile = async (uid: string, updatedData: any) => {
    try {
      const userDocRef = doc(db, 'users', uid);

      await setDoc(userDocRef, updatedData, { merge: true });
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar o perfil do usuário', error);
      return false;
    }
  };
