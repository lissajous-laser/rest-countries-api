import {expect, test} from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import Filter from '../components/Filter';
import { break1080 } from '../resources/constants';
import { Region } from '../resources/types';

const defaultRegion: Region = 'All'; 

const filterProps = {
  isDark: true,
  region: defaultRegion,
  setRegion: jest.fn(() => {}),
  searchTerm: '',
  setSearchTerm: jest.fn(() => {}),
  winWidth: break1080,
  setScrollY: jest.fn(() => {})
}

test('filter has a text input', () => {
  render(<Filter {...filterProps}/>);

  expect(screen.getByRole('searchbox')).toBeDefined();
});

test('text input value determined by searchTerm prop', () => {
  render(<Filter {...filterProps} searchTerm='Ukraine'/>);

  const textBox = screen.getByRole<HTMLInputElement>('searchbox');
  expect(textBox.value).toBe('Ukraine');
});

test('changing text input calls setSearchTerm', () => {
  render(<Filter {...filterProps}/>);

  const textBox = screen.getByRole<HTMLInputElement>('searchbox');
  fireEvent.change(textBox, {target: {value: 'Aus'}});
  expect(filterProps.setSearchTerm).toBeCalled();
});