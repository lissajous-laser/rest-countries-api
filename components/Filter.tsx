import { Ruge_Boogie } from '@next/font/google';
import Image from 'next/image';
import {Dispatch, SetStateAction, useLayoutEffect, useState} from 'react';
import Select from 'react-select';
import magnifyingGlassLight from '../public/images/magnifying-glass-gray.svg';
import magnifyingGlassDark from '../public/images/magnifying-glass-white.svg';
import {break720} from '../resources/constants';
import {mulish} from '../resources/fonts';
import {Region} from '../resources/types';
import style from '../styles/Filter.module.scss';


const options: {value: Region, label: string}[] = [
  {value: 'All', label: 'Filter by Region'},
  {value: 'Africa', label: 'Africa'},
  {value: 'Americas', label: 'America'},
  {value: 'Asia', label: 'Asia'},
  {value: 'Europe', label: 'Europe'},
  {value: 'Oceania', label: 'Oceania'}
];

export default function Filter({
  isDark,
  region,
  setRegion,
  searchTerm,
  setSearchTerm,
  winWidth
}: {
  isDark: boolean,
  region: Region,
  setRegion: Dispatch<SetStateAction<Region>>,
  searchTerm: string,
  setSearchTerm: Dispatch<SetStateAction<string>>,
  winWidth: number
}) {

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
          priority
        />
        <input
          className={`
            ${style.textInput}
            ${isDark ? style.textInputDark : ''}
            ${mulish.className}`
          }
          type='text'
          placeholder='Search for a country...'
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
        />
      </div>
      <Select
        className={`
          ${style.dropDown}
          ${mulish.className}
          ${isDark ? style.dropDownDark : ''}
        `}
        options={options}
        defaultValue={options[0]}
        onChange={(event) => {
          if (event !== null) {
            setRegion(event.value);
          }
        }}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: winWidth > break720 ? 56 : 48,
            width: 200,
            border: 'none',
            paddingLeft: 15,
            fontSize: winWidth > break720 ? 14 : 12,
            fontWeight: 400,
            backgroundColor: isDark ? 'rgb(43, 55, 67)' : 'white',
            borderRadius: 3
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: isDark ? 'white' : 'rgb(20, 20, 20)',
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            paddingLeft: 25,
            fontSize: winWidth > break720 ? 14 : 12,

          })

        }}
      />
    </div>
  );
}