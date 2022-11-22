import Head from 'next/head';
import Image from 'next/image';
import {useState} from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Filter from '../components/Filter';
import {mulish} from '../resources/fonts';
import {Country, Region} from '../resources/types';
import style from '../styles/Home.module.scss';




export default function Home() {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [region, setRegion] = useState<Region>('all');

  const getCountries = async () => {
    const maybeCountriesList = await fetch('https://restcountries.com/v2/all');
    if (maybeCountriesList.ok) {
      const jsonCountriesList = await maybeCountriesList.json();
      setCountriesList(jsonCountriesList);
    }
  }

  getCountries();

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
      <Filter isDark={isDark} setRegion={setRegion}/>
      <div className={style.gallery}>
        {countriesList.slice(0, 13).map((country) => <Card
          isDark={isDark}
          country={country}
          key={country.name}
          priority={true}
        />)}
        {countriesList.slice(13).map((country) => <Card
          isDark={isDark}
          country={country}
          key={country.name}
          priority={false}
        />)}
      </div>
    </div>
      
  );
}
