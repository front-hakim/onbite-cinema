import SearchLayout from '@/components/search-layout';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import allCienema from '@/mocks/all.json';
import MovieItem from '@/components/movieItem';
import style from '@/styles/search-result.module.css';

const Search = () => {
  const router = useRouter();

  const { q } = router.query;

  const result =
    typeof q === 'string' ? allCienema.filter((i) => i.title.includes(q)) : [];

  return (
    <div className={style.container}>
      {result.map((item) => (
        <MovieItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Search;

Search.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
