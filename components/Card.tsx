import Image from 'next/image';
import {Country} from '../resources/types';
import style from '../styles/Card.module.scss';

export default function Card({isDark, country, priority} : {isDark: boolean, country: Country, priority: boolean}) {
  const imageAlt = country.flags.svg + ' flag';
  return (
    <div className={`${style.cardContainer} ${isDark ? style.cardContainerDark : ''}`}>
      <Image
        className={style.flag}
        src={country.flags.svg}
        alt={imageAlt}
        width={264}
        height={160}
        priority={priority ? true : false}
      />
      <div className={style.textContainer}>
        <h2 className={style.heading}>{country.name}</h2>
        <div className={style.stat}>
          <span className={style.statName}>Population: </span>
          {country.population.toLocaleString('en')}
        </div>
        <div className={style.stat}>
          <span className={style.statName}>Region: </span>
          {country.region}
        </div>
        <div className={style.stat}>
          <span className={style.statName}>Captial: </span>
          {country.capital}
        </div>
      </div>
    </div>
  );
}