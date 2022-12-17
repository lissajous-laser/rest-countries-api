import {expect, test} from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import CountryButton from '../components/CountryButton';
import { sampleCountry } from '../resources/constants';

const countryButtonProps = {
  isDark: true,
  country: sampleCountry,
  setCountry: jest.fn(() => {})
}

test('name of country is rendered', () => {
  render(<CountryButton {...countryButtonProps}/>);
  expect(screen.getByText(sampleCountry.name)).toBeDefined();
});

test('setCountry called when button is fired', () => {
  render(<CountryButton {...countryButtonProps}/>);
  fireEvent.click(screen.getByRole('button'));
  expect(countryButtonProps.setCountry).toBeCalled();
});