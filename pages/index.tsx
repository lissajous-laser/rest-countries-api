import Head from 'next/head';
import Image from 'next/image';
import {useLayoutEffect, useState} from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Filter from '../components/Filter';
import {mulish} from '../resources/fonts';
import {Country, Region} from '../resources/types';
import style from '../styles/Home.module.scss';
import { count } from 'console';




export default function Home() {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [region, setRegion] = useState<Region>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useLayoutEffect(() => getCountries(2), []);

  /**
   * @param triesLeft - the max number of times to attempt
   * fetching from the API
   */
  const getCountries = (triesLeft: number = 1) => {
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
        getCountries(triesLeft - 1)
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
      </Head>
      <Header isDark={isDark} setIsDark={setIsDark}/>
      <Filter
        isDark={isDark}
        region={region}
        setRegion={setRegion}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className={style.gallery}>
        {filterCountries().map((country) => <Card
          isDark={isDark}
          country={country}
          key={country.name}
          priority={false}
        />)}
      </div>
    </div>   
  );
}
