import SearchLayout from '@/components/search-layout';
import React, { ReactNode } from 'react';
import MovieItem from '@/components/movieItem';
import style from '@/styles/home.module.css';
import fetchMovies from '@/lib/fetch-movies';
import { InferGetServerSidePropsType } from 'next';
import { MovieData } from '@/types';
import fetchRandomMovies from '@/lib/fetch-reco-movies';

export const getServerSideProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: { allMovies, recoMovies },
  };
};
const Home = ({
  allMovies,
  recoMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <div className={style.recommend}>
          {recoMovies.map((item: MovieData) => (
            <MovieItem key={item.id} {...item} />
          ))}
        </div>
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <div className={style.all}>
          {allMovies.map((item: MovieData) => (
            <MovieItem key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
