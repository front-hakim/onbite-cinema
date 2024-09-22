import React from 'react';
import style from '@/styles/detail.module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchDetailMovies from '@/lib/fetch-detail-movies';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: '995926' } }],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  const detail = await fetchDetailMovies(Number(id));

  return {
    props: { detail },
  };
};

// 매 요청마다 새로운 데이터를 보여주기 보다는
// id에 해당하는 데이터만 보여주면 되는 페이지이기 때문에 getStaticProps 설정
const Detail = ({ detail }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const isLoading = router.isFallback;

  if (isLoading) return 'Loading...';
  if (!detail) return '문제가 발생했습니다. 다시 시도해주세요.';

  const {
    company,
    description,
    genres,
    posterImgUrl,
    releaseDate,
    runtime,
    subTitle,
    title,
  } = detail;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={posterImgUrl} />
      </Head>
      <div className={style.container}>
        <div
          className={style.background}
          style={{
            background: `url(${posterImgUrl}) center no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <img src={posterImgUrl} alt={title} />
        </div>
        <h3>{title}</h3>
        <p>
          {releaseDate} / {genres.join(', ')} / {runtime}분
        </p>
        <p>{company}</p>
        <h4>{subTitle}</h4>
        <p>{description}</p>
      </div>
    </>
  );
};

export default Detail;
