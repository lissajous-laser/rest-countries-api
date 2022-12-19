import {expect, test} from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
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

beforeEach(() => {

});

test('filter has a text input', () => {
  render(<Filter {...filterProps}/>);

  expect(screen.getByRole('searchbox')).toBeDefined();
});

test('text input value controlled by searchTerm prop', () => {
  render(<Filter {...filterProps} searchTerm='Ukraine'/>);

  const textBox = screen.getByRole<HTMLInputElement>('searchbox')
  expect(textBox.value).toBe('Ukraine');
});

test('text input value controlled by searchTerm prop', () => {
  render(<Filter {...filterProps} searchTerm='Ukraine'/>);

  const textBox = screen.getByRole<HTMLInputElement>('searchbox')
  expect(textBox.value).toBe('Ukraine');
});