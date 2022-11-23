import {Dispatch, SetStateAction} from 'react';
import {mulish} from '../resources/fonts';
import {Country} from '../resources/types';
import style from '../styles/CountryButton.module.scss';

/**
 * Button for linking to neighbouring countries in
 * country view.
 */
export default function CountryButton({isDark, country, setCountry}: {
  isDark: boolean,
  country: Country,
  setCountry: Dispatch<SetStateAction<Country | null>>
}) {
  return (
    <button
      className={`${style.btn} ${mulish.className} ${isDark ? style.btnDark : ''}`}
      onClick={() => setCountry(country)}
    >
      {country.name}
    </button>
  );
}