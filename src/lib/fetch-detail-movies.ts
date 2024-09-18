import { MovieData } from '@/types';

export default async function fetchDetailMovies(
  id: number
): Promise<MovieData | null> {
  const url = process.env.NEXT_PUBLIC_API_URL + `/movie/${id}`;

  try {
    const res = await fetch(url);
    if (!res) {
      throw new Error();
    }

    return res.json();
  } catch (error) {
    console.error('error', error);
    return null;
  }
}
