import SearchLayout from '@/components/search-layout';
import React, { ReactNode } from 'react';
import allCienema from '@/mocks/all.json';
import recommendCienema from '@/mocks/recommend.json';
import MovieItem from '@/components/movieItem';
import style from '@/styles/home.module.css';

const Home = () => {
  return (
    <div>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <div className={style.recommend}>
          {recommendCienema.map((item) => (
            <MovieItem key={item.id} {...item} />
          ))}
        </div>
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <div className={style.all}>
          {allCienema.map((item) => (
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
