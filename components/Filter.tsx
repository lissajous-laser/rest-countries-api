import { Ruge_Boogie } from '@next/font/google';
import Image from 'next/image';
import {Dispatch, SetStateAction} from 'react';
import Select from 'react-select';
import magnifyingGlassLight from '../public/images/magnifying-glass-gray.svg';
import magnifyingGlassDark from '../public/images/magnifying-glass-white.svg';
import {mulish} from '../resources/fonts';
import {Region} from '../resources/types';
import style from '../styles/Filter.module.scss';


const options: {value: Region, label: string}[] = [
  {value: 'all', label: 'Filter by Region'},
  {value: 'africa', label: 'Africa'},
  {value: 'america', label: 'America'},
  {value: 'asia', label: 'Asia'},
  {value: 'europe', label: 'Europe'},
  {value: 'oceania', label: 'Oceania'}
];

export default function Filter({isDark, setRegion}
  : {isDark: boolean, setRegion: Dispatch<SetStateAction<Region>>}
) {

  return (
    <div
      className={`
        ${style.filterContainer}
        ${isDark ? style.filterContainerDark : ''}
      `}
    >
      <div
        className={`
          ${style.searchIconAndInput}
          ${isDark? style.searchIconAndInputDark : ''}
        `}
      >
        <Image
          className={style.searchIcon}
          src={isDark ? magnifyingGlassDark : magnifyingGlassLight}
          alt='Serach icon'
        />
        <input
          className={`
            ${style.textInput}
            ${isDark ? style.textInputDark : ''}
            ${mulish.className}`
          }
          type='text'
          placeholder='Search for a country...'
        />
      </div>
      {/* <select className={`${style.dropDown} ${mulish.className}`}>
        <option value='' selected>Filter by Region</option>
        <option value='1'>Africa</option>
        <option value='2'>America</option>
        <option value='3'>Asia</option>
        <option value='4'>Europe</option>
        <option value='5'>Oceania</option>
      </select>  */}
      <Select
        className={`
          ${style.dropDown}
          ${mulish.className}
          ${isDark ? style.dropDownDark : ''}
        `}
        options={options}
        defaultValue={options[0]}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: 56,
            width: 200,
            border: 'none',
            paddingLeft: 15,
            fontSize: 14,
            fontWeight: 600,
            backgroundColor: isDark ? 'rgb(43, 55, 67)' : 'white',
            borderRadius: 4
            // color: isDark ? 'white' : 'black',
            // outline: 'none',
          }),
          singleValue: (base) => ({
            ...base,
            color: isDark ? 'white' : 'rgb(20, 20, 20)',
          }),
        }}
      />
    </div>
  );
}