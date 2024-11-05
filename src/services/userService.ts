import { arrayRemove, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

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

export const addSharedList = async (newList: any) => {
  try {
    const listDocRef = doc(db, 'listasCompartilhadas', newList.codigo);  // Cria o documento com o código da lista
    await setDoc(listDocRef, newList);  // Salva a lista na coleção listasCompartilhadas
    return true;
  } catch (error) {
    console.error('Erro ao adicionar lista compartilhada', error);
    return false;
  }
};

export const removeFromUserList = async (uid: string, itemToRemove: any) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      minhasListas: arrayRemove(itemToRemove)
    });
    return true;
  } catch (error) {
    console.error('Erro ao remover item da lista do usuário', error);
    return false;
  }
};

export const updateUserList = async (uid: string, updatedList: any) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      let listasAtualizadas = userData.minhasListas || [];

      const indexLista = listasAtualizadas.findIndex((lista: any) => lista.name === updatedList.name);
      console.log(indexLista);

      if (indexLista !== -1) {
        const midiaExistente = updatedList.midias[0];

        const jaExiste = listasAtualizadas[indexLista].midias?.some((m: any) => m.mediaId === midiaExistente.mediaId);

        if (!jaExiste) listasAtualizadas[indexLista].midias.push(midiaExistente);
      } else {
        listasAtualizadas.push(updatedList);
      }

      await updateDoc(userDocRef, { minhasListas: listasAtualizadas });
      return true;
    } else {
      console.error('Documento de usuário não encontrado');
      return false;
    }
  } catch (error) {
    console.error('Erro ao atualizar a lista do usuário', error);
    return false;
  }
};

export const updateUserFavorite = async (uid: string, updatedFav: any) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, { favoritos: updatedFav });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar favoritos do usuário', error);
    return false;
  }
}

export const updateUserRate = async (uid: string, updatedRate: any) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, { avaliacoes: updatedRate });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar avaliações do usuário', error);
    return false;
  }
}