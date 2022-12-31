import { selectOptions } from '../resources/constants';
import Image from 'next/image';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Select from 'react-select';
import magnifyingGlassLight from '../public/images/magnifying-glass-gray.svg';
import magnifyingGlassDark from '../public/images/magnifying-glass-white.svg';
import {break720} from '../resources/constants';
import {mulish} from '../resources/fonts';
import {Region} from '../resources/types';
import style from '../styles/Filter.module.scss';
import { Black_And_White_Picture } from '@next/font/google';


/**
 * Contains text input for search, down-down for region,
 * and the listener for scoll state.
 */
export default function Filter({
  isDark,
  region,
  setRegion,
  searchTerm,
  setSearchTerm,
  winWidth,
  setScrollY
} : {
  isDark: boolean,
  region: Region,
  setRegion: Dispatch<SetStateAction<Region>>,
  searchTerm: string,
  setSearchTerm: Dispatch<SetStateAction<string>>,
  winWidth: number,
  setScrollY: Dispatch<SetStateAction<number>>
}) {

  // Stores state of debouncing mechanism.
  const [lastTimeout, setLastTimeout] = useState(setTimeout(() => {}, 0));

  useEffect(() => {

    // Handler is debounced.
    const scrollHandler = () => {
      const newTimeout =
        setTimeout(() => {setScrollY(window.scrollY)}, 400);

      clearTimeout(lastTimeout);
      setLastTimeout(newTimeout);
    }

    window.addEventListener('scroll', scrollHandler);
  
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

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
          alt='Search icon'
        />
        <input
          className={`
            ${style.textInput}
            ${isDark ? style.textInputDark : ''}
            ${mulish.className}`
          }
          type='search'
          placeholder='Search for a country...'
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          aria-label='Search for a country'
        />
      </div>
      <Select
        className={`
          ${style.dropDown}
          ${mulish.className}
          ${isDark ? style.dropDownDark : ''}
        `}
        options={selectOptions}
        defaultValue={selectOptions[0]}
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
            color: 'rgb(20, 20, 20)',
          })

        }}
      />
    </div>
  );
}