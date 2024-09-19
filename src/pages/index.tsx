import SearchLayout from '@/components/search-layout';
import React, { ReactNode, useEffect, useState } from 'react';
import MovieItem from '@/components/movieItem';
import style from '@/styles/home.module.css';
import fetchMovies from '@/lib/fetch-movies';
import { InferGetStaticPropsType } from 'next';
import { MovieData } from '@/types';
import fetchRandomMovies from '@/lib/fetch-reco-movies';

export const getStaticProps = async () => {
  const allMovies = await fetchMovies();

  return {
    props: { allMovies },
  };
};

// 추천 도서는 실시간으로 변경되어야 한다고 생각되어 클라이언트 사이드에서 데이터 별도 호출
// 전체 도서는 변경될 일이 없다고 생각되어 getStaticProps로 호출
const Home = ({
  allMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [recoMovies, setRecoMovies] = useState<MovieData[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchRandomMovies();
      setRecoMovies(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <div className={style.recommend}>
          {recoMovies.map((item: MovieData) => (
            <MovieItem key={`reco-${item.id}`} {...item} />
          ))}
        </div>
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <div className={style.all}>
          {allMovies.map((item: MovieData) => (
            <MovieItem key={`all-${item.id}`} {...item} />
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
