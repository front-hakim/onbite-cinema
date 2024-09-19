import fetchInstance from './fetch-instance';

export default async function fetchMovies() {
  return fetchInstance('/movie');
}
