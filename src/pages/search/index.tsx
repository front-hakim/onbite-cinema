import SearchLayout from '@/components/search-layout';
import React, { ReactNode } from 'react';
import MovieItem from '@/components/movieItem';
import style from '@/styles/search-result.module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchSearchMovies from '@/lib/fetch-search-movies';
import { MovieData } from '@/types';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;

  const result = await fetchSearchMovies(q as string);

  return {
    props: { result },
  };
};

const Search = ({
  result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={style.container}>
      {result.map((item: MovieData) => (
        <MovieItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Search;

Search.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
