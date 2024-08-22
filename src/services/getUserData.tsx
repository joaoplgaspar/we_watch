import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('No user data found!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};