import { Country, Region } from "./types";

export const break1280 = 1280;
export const break1080 = 1080;
export const break720 = 720;
export const break640 = 640;

// For tests.
export const sampleCountryAus: Country = {
  name: 'Australia',
  population: 25_687_041,
  region: 'Oceania',
  capital: 'Canberra',
  flags: {svg: 'https://flagcdn.com/au.svg'},
  nativeName: 'Australia',
  subregion: 'Australia and New Zealand',
  topLevelDomain: ['.au'],
  currencies: [{name: 'Australian dollar'}],
  languages: [{name: 'English'}],
  alpha3Code: 'AUS'
};

export const sampleCountryIrl: Country = {
  name: 'Ireland',
  population: 4_994_724,
  region: 'Europe',
  capital: 'Dublin',
  flags: {svg: 'https://flagcdn.com/ie.svg'},
  nativeName: 'Éire',
  subregion: 'Northern Europe',
  topLevelDomain: ['.ie'],
  currencies: [{name: 'Euro'}],
  languages: [{name: 'Irish'}, {name: 'English'}],
  alpha3Code: 'IRL',
  borders: ['GBR'],
}

export const sampleCountryGbr: Country = {
  name: 'United Kingdom of Great Britain and Northern Ireland',
  population: 67_215_293,
  region: 'Europe',
  capital: 'London',
  flags: {svg: 'https://flagcdn.com/gb.svg'},
  nativeName: 'United Kingdom',
  subregion: 'Northern Europe',
  topLevelDomain: ['.uk'],
  currencies: [{name: 'British pound'}],
  languages: [{name: 'English'}],
  alpha3Code: 'GBR',
  borders: ['IRL'],
}


// Options for select comoponent in filter.
export const selectOptions: {value: Region, label: string}[] = [
  {value: 'All', label: 'Filter by Region'},
  {value: 'Africa', label: 'Africa'},
  {value: 'Americas', label: 'America'},
  {value: 'Asia', label: 'Asia'},
  {value: 'Europe', label: 'Europe'},
  {value: 'Oceania', label: 'Oceania'}
];
