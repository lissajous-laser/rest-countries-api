import {expect, test} from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import CountryButton from '../components/CountryButton';
import { sampleCountryAus } from '../resources/constants';

const countryButtonProps = {
  isDark: true,
  country: sampleCountryAus,
  setCountry: jest.fn(() => {})
}

beforeEach(() => {
  render(<CountryButton {...countryButtonProps}/>);
});

test('name of country is rendered', () => {
  expect(screen.getByText(sampleCountryAus.name)).toBeDefined();
});

test('setCountry called when button is fired', () => {
  fireEvent.click(screen.getByRole('button'));
  expect(countryButtonProps.setCountry).toBeCalled();
});