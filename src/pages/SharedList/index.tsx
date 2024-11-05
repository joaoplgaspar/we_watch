import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from 'services/firebaseConfig';
import { useAuth } from 'contexts/AuthContext';
import { useUser } from 'contexts/UserContext';

export default function SharedList() {
    const { codigo } = useParams();  // Obtém o código da URL
    const { currentUser } = useAuth();
    const { userData, updateUserData } = useUser();
    const [ lista, setLista ] = useState<any>(null);

    useEffect(() => {
        const fetchList = async () => {
            // Certifique-se de que o código existe
            if (!codigo) return;
        
            // Cria a referência ao documento usando a coleção 'listasCompartilhadas' e o código
            const listaRef = doc(db, 'listasCompartilhadas', codigo);  // 'doc' retorna uma referência ao documento
            const listaSnapshot = await getDoc(listaRef);  // 'getDoc' busca o documento
        
            if (!currentUser) return;
        
            if (listaSnapshot.exists()) {
                const listaData = listaSnapshot.data();
                setLista(listaData);
        
                // Verifica se a lista já foi adicionada ao perfil do usuário
                const listaJaAdicionada = userData.minhasListas.find((l: any) => l.codigo === codigo);
                if (!listaJaAdicionada) {
                    // Adiciona a lista ao perfil do usuário
                    const novaLista = {
                        ...listaData,
                        midias: listaData.midias || []
                    };
        
                    await updateDoc(doc(db, 'users', currentUser.uid), {
                        minhasListas: arrayUnion(novaLista)
                    });
        
                    updateUserData({
                        ...userData,
                        minhasListas: [...userData.minhasListas, novaLista]
                    });
        
                    alert('Lista compartilhada adicionada ao seu perfil!');
                }
            } else {
                alert('Lista não encontrada');
            }
        };
        

        if (codigo) {
            fetchList();
        }
    }, [codigo, currentUser, userData, updateUserData]);

    return (
        <div>
            {lista ? (
                <div>
                    <h2>{lista.name}</h2>
                    {/* Renderize as informações da lista */}
                </div>
            ) : (
                <p>Carregando lista...</p>
            )}
        </div>
    );
}
