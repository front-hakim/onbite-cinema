import fetchInstance from './fetch-instance';

export default async function fetchSearchMovies(q: string) {
  return fetchInstance(`/movie/search?q=${q}`);
}
