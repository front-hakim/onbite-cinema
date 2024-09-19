import React from 'react';
import style from '@/styles/detail.module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchDetailMovies from '@/lib/fetch-detail-movies';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;

  const detail = await fetchDetailMovies(Number(id));

  return {
    props: { detail },
  };
};

const Detail = ({
  detail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
  );
};

export default Detail;
