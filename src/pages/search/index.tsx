import { useRouter } from 'next/router';
import React from 'react';

const Search = () => {
  const router = useRouter();

  const { q } = router.query;
  return <h1>검색 결과 : {q}</h1>;
};

export default Search;
