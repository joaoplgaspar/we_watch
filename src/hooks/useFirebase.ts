import { doc, setDoc } from 'firebase/firestore';
import { db } from 'services/firebaseConfig';

export default function useFirebase() {
    return { db, doc, setDoc };
}