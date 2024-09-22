import SearchLayout from '@/components/search-layout';
import React, { ReactNode, useEffect, useState } from 'react';
import MovieItem from '@/components/movieItem';
import style from '@/styles/search-result.module.css';
import fetchSearchMovies from '@/lib/fetch-search-movies';
import { MovieData } from '@/types';
import { useRouter } from 'next/router';
import Head from 'next/head';

// 검색 결과가 많다면 요청이 있을 때마다 서버사이드에서 데이터 패칭하는 것이 부담될 것으로 생각됨
const Search = () => {
  const router = useRouter();
  const q = router.query.q as string;

  const [result, setResult] = useState<MovieData[]>([]);

  const fetch = async () => {
    const data = await fetchSearchMovies(q as string);
    setResult(data);
  };

  useEffect(() => {
    if (q) {
      fetch();
    }
  }, [q]);

  if (!result) return 'Loading...';

  return (
    <>
      <Head>
        <title>한입 영화 - {q}</title>
        <meta property="og:title" content={q} />
        <meta property="og:description" content="한입 영화 메인페이지입니다." />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
      <div className={style.container}>
        {result.map((item: MovieData) => (
          <MovieItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Search;

Search.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
