import { MovieData } from '@/types';

export default async function fetchInstance(
  path: string
): Promise<MovieData[]> {
  const url = process.env.NEXT_PUBLIC_API_URL + path;

  try {
    const res = await fetch(url);
    if (!res) {
      throw new Error();
    }

    return res.json();
  } catch (error) {
    console.error('error', error);
    return [];
  }
}
