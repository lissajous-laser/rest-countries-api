export type Country = {
  name: string,
  population: number,
  region: string,
  capital: string,
  flags: {svg: string},
}

export type Region =
  'all' | 'africa' | 'america' | 'asia' | 'europe' | 'oceania';
