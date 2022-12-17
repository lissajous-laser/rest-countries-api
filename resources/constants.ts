import { Country, Region } from "./types";

export const break1280 = 1280;
export const break1080 = 1080;
export const break720 = 720;
export const break640 = 640;

// For tests.
export const sampleCountry: Country = {
  name: 'Australia',
  population: 25687041,
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

// Options for select comoponent in filter.
export const selectOptions: {value: Region, label: string}[] = [
  {value: 'All', label: 'Filter by Region'},
  {value: 'Africa', label: 'Africa'},
  {value: 'Americas', label: 'America'},
  {value: 'Asia', label: 'Asia'},
  {value: 'Europe', label: 'Europe'},
  {value: 'Oceania', label: 'Oceania'}
];
