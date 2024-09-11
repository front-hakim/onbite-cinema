import SearchLayout from '@/components/search-layout';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

const Search = () => {
  const router = useRouter();

  const { q } = router.query;
  return <h1>검색 결과 : {q}</h1>;
};

export default Search;

Search.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
