import React from 'react';
import style from '@/styles/detail.module.css';
import detail from '@/mocks/detail.json';

const Detail = () => {
  const {
    company,
    description,
    genres,
    posterImgUrl,
    releaseDate,
    runtime,
    subTitle,
    title,
  } = detail[0];

  return (
    <div className={style.container}>
      <div className={style.background}>
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
