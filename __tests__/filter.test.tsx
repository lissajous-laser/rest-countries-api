import {expect, test} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { SetStateAction } from 'react';
import Filter from '../components/Filter';
import { break1080, selectOptions } from '../resources/constants';
import { Region } from '../resources/types';

const defaultRegion: Region = 'All'; 

const filterProps = {
  isDark: true,
  region: defaultRegion,
  setRegion: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  winWidth: break1080,
  setScrollY: () => {}
}

test('filter has a text input', () => {
  render(<Filter {...filterProps}/>);

  expect(screen.getByRole('searchbox')).toBeDefined();
});
