import MainMidia from 'components/MainMidia';
import MidiaBanner from 'components/MidiaBanner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMidia, getMidiaCredits, getMidiaProviders } from 'services/getApi';
import { IMediaCredits, IMediaDetails, IMediaProviders } from 'types/IMedia';

export default function Midia() {
  const [midia, setMidia] = useState<IMediaDetails>();
  const [credits, setCredits] = useState<IMediaCredits>();
  const [providers, setProviders] = useState<IMediaProviders>();

  const [directors, setDirectors] = useState<IMediaCredits['crew']>();
  // const [recommendations, setRecommendations] = useState<IMediaRecommendations>();
  
  const params = useParams();

  useEffect(() => {
      getMidia(params.id as string, params.midia as string).then(midia => {
        setMidia(midia);
      }).catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });

      getMidiaCredits(params.id as string, params.midia as string).then(credits => {
        setCredits(credits);
        setDirectors(credits.crew?.filter((crew: any) => crew.job === 'Director'))
      }).catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });

      getMidiaProviders(params.id as string, params.midia as string).then(providers => {
        setProviders(providers);
      }).catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });

  }, [params.id, params.midia]);

  return (
    <main>
      <MidiaBanner bannerSrc={midia?.backdrop_path} />
      <MainMidia 
        title={midia?.title}
        tagline={midia?.tagline}
        overview={midia?.overview}
        poster_path={midia?.poster_path}
        release_date={midia?.release_date}
        directors={directors}
        providers={providers?.results}
      />
    </main>
  )
}