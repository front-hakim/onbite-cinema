import SearchLayout from '@/components/search-layout';
import React, { ReactNode } from 'react';
import MovieItem from '@/components/movieItem';
import style from '@/styles/home.module.css';
import fetchMovies from '@/lib/fetch-movies';
import { InferGetStaticPropsType } from 'next';
import { MovieData } from '@/types';
import fetchRandomMovies from '@/lib/fetch-reco-movies';
import Head from 'next/head';

// ISR 적용 후 클라이언트 사이드에서 패치하던 추천 도서 api 호출 코드 제거
export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: { allMovies, recoMovies },
    revalidate: 5,
  };
};

// 추천 도서는 실시간으로 변경되어야 한다고 생각되어 클라이언트 사이드에서 데이터 별도 호출
// 전체 도서는 변경될 일이 없다고 생각되어 getStaticProps로 호출
const Home = ({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>한입 영화</title>
        <meta property="og:title" content="한입 영화" />
        <meta property="og:description" content="한입 영화 메인페이지입니다." />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
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
    </>
  );
};

export default Home;

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
