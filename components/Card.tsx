import Image from 'next/image';
import {Dispatch, SetStateAction} from 'react';
import {Country} from '../resources/types';
import style from '../styles/Card.module.scss';

export default function Card({isDark, country, setCountry} : {
  isDark: boolean,
  country: Country,
  setCountry: Dispatch<SetStateAction<Country | null>>
}) {

  return (
    <article
      className={`
        ${style.cardContainer}
        ${isDark ? style.cardContainerDark : ''}
      `}
      onClick={() => setCountry(country)}
    >
      <Image
        className={style.flag}
        src={country.flags.svg}
        alt={'Flag of ' + country.name}
        width={264}
        height={160}
      />
      <div className={style.textContainer}>
        <h2 className={style.heading}>{country.name}</h2>
        <ul className={style.stats}>
          <li className={style.stat}>
            <span className={style.statName}>Population: </span>
            {country.population.toLocaleString('en')}
          </li>
          <li className={style.stat}>
            <span className={style.statName}>Region: </span>
            {country.region}
          </li>
          <li className={style.stat}>
            <span className={style.statName}>Captial: </span>
            {country.capital}
          </li>
        </ul>
      </div>
    </article>
  );
}