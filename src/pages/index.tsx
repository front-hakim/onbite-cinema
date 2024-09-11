import SearchLayout from '@/components/search-layout';
import React, { ReactNode } from 'react';

const Home = () => {
  return <h1>ONEBITE CINEMA Home</h1>;
};

export default Home;

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
