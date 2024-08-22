export default function getApi() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2Q1YWNhNmU1N2RiZTIxOTZiMzJkZWM2NzZlZmVkOCIsIm5iZiI6MTcyMjI5MDEwNy42Nzg2NTcsInN1YiI6IjY2YTgwZTc0Y2UwMWI0MTkwZjgwODRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KjoEVvyY7cYytgW2NFy7xTAUb1sVhDPxjNbUZyvYt_c'
    }
  };

  return fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(data => {
      return data.results
    })
    .catch(err => {
      console.error(err);
      return [];
    });
}