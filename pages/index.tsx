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

  useEffect(() => fetchCountriesList(2), []);


  // useEffect(() => {
  //   if (country) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }
  // }, [country]);

  const [winWidth, setWinWidth] = useState(0);

  useLayoutEffect(() => {
    setWinWidth(window.innerWidth);

    window.addEventListener(
      'resize',
      () => setWinWidth(window.innerWidth)
    );

    return () => {
      window.removeEventListener(
        'resize',
        () => setWinWidth(window.innerWidth)
      );
    }
  }, [])

  /**
   * @param triesLeft - the max number of times to attempt
   * fetching from the API
   */
  const fetchCountriesList = (triesLeft: number = 1) => {
    // const maybeCountriesList = await fetch('https://restcountries.com/v2/all');
    // if (maybeCountriesList.ok) {
    //   const jsonCountriesList = await maybeCountriesList.json();
    //   setCountriesList(jsonCountriesList);
    // }
    if (triesLeft === 0) {
      alert('The data could not be accessed.'
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

  const filterCountries = () => {
    return countriesList.filter((country) => {

      const searchMatch = country
        .name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const regionMatch = region === 'All' ? true : country.region === region;

      return searchMatch && regionMatch;
    });
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
          />
          <div className={style.gallery}>
            {filterCountries().map((country, idx) => <Card
              isDark={isDark}
              country={country}
              key={country.name}
              priority={idx < 4 ? true : false} // reduce LCP time 
              setCountry={setCountry}
            />)}
          </div>
        </>
      }

    </div>   
  );
}
