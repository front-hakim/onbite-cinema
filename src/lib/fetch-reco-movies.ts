import fetchInstance from './fetch-instance';

export default async function fetchRandomMovies() {
  return fetchInstance('/movie/random');
}
