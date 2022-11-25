import Head from 'next/head';
import Image from 'next/image';
import {useEffect, useLayoutEffect, useState} from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Filter from '../components/Filter';
import {mulish} from '../resources/fonts';
import {Country, Region} from '../resources/types';
import style from '../styles/Home.module.scss';
import CountryView from '../components/CountryView';




export default function Home() {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [region, setRegion] = useState<Region>('All');
  // State for the search bar
  const [searchTerm, setSearchTerm] = useState<string>('');
  // State for the current country being displayed,
  // null represents no selection.
  const [country, setCountry] = useState<Country | null>(null);
  // State of Window.scrollY from the main view.
  const [scrollY, setScrollY] = useState<number>(0);
  const [winWidth, setWinWidth] = useState(0);

  useEffect(() => fetchCountriesList(), []);

  useLayoutEffect(() => {
    setWinWidth(window.innerWidth);

    const fn = () => setWinWidth(window.innerWidth);

    window.addEventListener('resize', fn);

    return () => window.removeEventListener('resize', fn);
  }, []);

  // Restores scroll state when exiting country view.
  useEffect(() => {
    if (country === null) {
      window.scrollTo(0, scrollY);
    }
  }, [country]);

  /**
   * @param triesLeft - the max number of times to attempt
   * fetching from the API
   */
  const fetchCountriesList = (triesLeft: number = 2) => {
    if (triesLeft === 0) {
      alert('The country data could not be accessed.'
        + '\nPlease try again at a later time.');
    }

    fetch('https://restcountries.com/v2/all')
      .then((resolved) => {
        return resolved.json()
      }).then((resolved) => {
        setCountriesList(resolved);
      }).catch(() => {
        fetchCountriesList(triesLeft - 1)
      });
  }

  /**
   * @returns List of countries matching search field and
   * region in drop-down box. 
   */
  const filterCountries = () => {
    return countriesList.filter((country) => {

      const searchMatch = country
        .name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const regionMatch =
        region === 'All'
        ? true
        : country.region === region;

      return searchMatch && regionMatch;
    });
  }

  const createCards = () => {
    const cardsList = filterCountries().map((country, idx) => (
      <Card
        isDark={isDark}
        country={country}
        key={country.name}
        setCountry={setCountry}
      />
    ))

    return cardsList.length === 0
      ? <p>No matching results</p>
      : cardsList;
  }

  return (
    <div className={`
      ${`${style.container} ${isDark ?  style.containerDark : ''}`}
      ${mulish.className}
    `}>
      <Head>
        <title>REST Counties API</title>
        <meta name="description" content="Frontend Mentor Challenge"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel='preconnect' href='https://upload.wikimedia.org'/>
        <link rel='preconnect' href='https://restcountries.com'/>
        <link rel='preconnect' href='https://flagcdn.com'/>
      </Head>
      <Header isDark={isDark} setIsDark={setIsDark}/>
      <main>
        {country !== null && 
          <CountryView
            isDark={isDark}
            country={country}
            setCountry={setCountry}
            countriesList={countriesList}
            winWidth={winWidth}
          />
        }
        {country === null &&
          <>
            <Filter
              isDark={isDark}
              region={region}
              setRegion={setRegion}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              winWidth={winWidth}
              setScrollY={setScrollY}
            />
            <div className={style.gallery}>
              {createCards()}
            </div>
          </>
        }
      </main>
    </div>

  );
}
