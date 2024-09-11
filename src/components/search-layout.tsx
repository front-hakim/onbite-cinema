import React, { ReactNode, useEffect, useState } from 'react';
import style from '@/styles/search-layout.module.css';
import { useRouter } from 'next/router';

const SearchLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const q = router.query.q;

  const [searchValue, setSearchValue] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    router.push({
      pathname: '/search',
      query: { q: searchValue },
    });
  };

  useEffect(() => {
    setSearchValue('');
  }, [q]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          onChange={handleInput}
          value={searchValue}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      {children}
    </div>
  );
};

export default SearchLayout;
