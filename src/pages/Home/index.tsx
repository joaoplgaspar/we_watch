import Banner from 'components/Banner';
import Card from 'components/Card';
import CardsBox from 'components/CardsBox';
import { useEffect, useState } from 'react';
import getApi from 'services/getApi';
import { IMedia } from 'types/Media';

export default function Home() {
  const [moviesBox, setMoviesBox] = useState<IMedia[]>([]);

  useEffect(() => {
    getApi().then(movies => {
      setMoviesBox(movies);
    }).catch(error => {
      console.error('Erro ao buscar dados da API:', error);
    });
  }, []);

  return (
    <>
      <Banner />
      <CardsBox>
        {moviesBox.map(media => <Card {...media}/>)}
      </CardsBox>
    </>
  );
}