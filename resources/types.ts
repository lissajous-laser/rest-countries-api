export type Country = {
  name: string,
  population: number,
  region: string,
  capital: string,
  flags: {svg: string},
  subregion: string,
  topLevelDomain: string[],
  currencies: {name: string}[],
  languages: {name: string}[],
  borders: string[],
  alpha3Code: string
}

export type Region =
  'All' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
