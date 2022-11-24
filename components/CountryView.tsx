import Image from 'next/image';
import {Dispatch, SetStateAction} from 'react';
import leftArrowLight from '../public/images/left-arrow-black.svg';
import leftArrowDark from '../public/images/left-arrow-white.svg';
import { break1080, break1280, break640, break720 } from '../resources/constants';
import {mulish} from '../resources/fonts';
import {Country} from '../resources/types';
import style from '../styles/CountryView.module.scss';
import CountryButton from './CountryButton';

export default function CountryView({
  isDark, 
  country, 
  setCountry, 
  countriesList,
  winWidth
} : {
  isDark: boolean,
  country: Country,
  setCountry: Dispatch<SetStateAction<Country | null>>,
  countriesList: Country[],
  winWidth: number
}) {

  const flagW = 560;
  const flagH = 400;

  const enumerate = (list: string[]) => {
    const itemsWithCommas = list.reduce((acc, curr) => acc + ', ' + curr, '');
    return itemsWithCommas.slice(2);
  }

  const makeButtonForCountry = (countryCode: string) => {

    const country = countriesList.find(
      (element) => element.alpha3Code === countryCode
    );

    if (country === undefined) {
      return undefined;
    } else {
      return (
        <CountryButton 
          isDark={isDark}
          country={country}
          setCountry={setCountry}
        />
      );
    }
  } 

  return (
    <div
      className={`
        ${style.viewContainer}
        ${isDark? style.viewContainerDark : ''}
      `}
    >
      <div className={style.pgPadding}>
        <button
          className={`
            ${style.backBtn}
            ${mulish.className}
            ${isDark ? style.backBtnDark : ''}
          `}
          onClick={() => setCountry(null)}
        >
          <Image
            className={style.arrow}
            src={isDark ? leftArrowDark : leftArrowLight}
            alt='Back icon'
          />
          <div>Back</div>
        </button>
        <div className={style.flagAndText}>
          <Image
            className={style.flag}
            src={country.flags.svg}
            alt={'Flag of ' + country.name}
            width={winWidth > break1280 ? flagW : winWidth > break1080 ? flagW * 0.83 : winWidth > break640 ? flagW * 0.66 : 320}
            height={winWidth > break1280 ? flagH : winWidth > break1080 ? flagH * 0.83 : winWidth > break640 ? flagH * 0.66 : 229}
          />
          <div className={`${style.text} ${isDark? style.textDark : ''}`}>
            <h2 className={style.heading}>{country.name}</h2>
            <div className={style.columns}>
              <div className={style.columnL}>
                <div className={style.stat}>
                  <span className={style.statName}>Native Name: </span>
                  {country.nativeName}
                </div>
                <div className={style.stat}>
                  <span className={style.statName}>Population: </span>
                  {country.population.toLocaleString('en')}
                </div>
                <div className={style.stat}>
                  <span className={style.statName}>Region: </span>
                  {country.region}
                </div>
                <div className={style.stat}>
                  <span className={style.statName}>Sub Region: </span>
                  {country.subregion}
                </div>
                <div className={style.stat}>
                  <span className={style.statName}>Captial: </span>
                  {country.capital}
                </div>
              </div>
              <div className={style.columnR}>
                <div className={style.stat}>
                  <span className={style.statName}>Top Level Domain: </span>
                  {country.topLevelDomain}
                </div>
                <div className={style.stat}>
                  <span className={style.statName}>Currencies: </span>
                  {country.currencies && enumerate(country.currencies.map((x) => x.name))}
                </div>
                <div className={style.stat}>
                  <span className={style.statName}>Languages: </span>
                  {enumerate(country.languages.map((x) => x.name))}
                </div>
              </div>
            </div>
            <div className={style.nav}>
              <div className={style.statName}>Border Countries: </div>
              <div className={style.buttons}>
                {country.borders && country.borders.map(x => makeButtonForCountry(x))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}