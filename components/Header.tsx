import Image from 'next/image';
import {Dispatch, SetStateAction} from 'react';
import moonLight from '../public/images/moon-outline-black.svg';
import moonDark from '../public/images/moon-filled-white.svg';
import {mulish} from '../resources/fonts';
import style from '../styles/Header.module.scss';

export default function Header({isDark, setIsDark}
  : {isDark: boolean, setIsDark: Dispatch<SetStateAction<boolean>>}
) {

  const toggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDark((state) => !state);
  }

  return (
    <header
      className={`
        ${style.headerContainer}
        ${isDark ? style.headerContainerDark : ''}
      `}
    >
      <h1 className={style.h1}>Where in the world?</h1>
      <button
        className={`${style.button} ${isDark ? style.buttonDark : ''}`}
        onClick={toggleDarkMode}
      >
        <Image
          className={style.crescent} src={isDark? moonDark : moonLight}
          alt={'Crescent moon icon'}
        />
        <div className={`${mulish.className} ${style.btnText}`}>
          Dark Mode
        </div>
      </button>
    </header>
  );
}