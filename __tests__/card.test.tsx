import {expect, test} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import { Dispatch, SetStateAction } from 'react';
import Card from '../components/Card';
import { sampleCountryAus } from '../resources/constants';

const cardProps = {
  isDark: true,
  country: sampleCountryAus,
  setCountry: () => {}
};

beforeEach(() => {
  render(<Card {...cardProps}/>);
})

test('country name is rendered', () => {
  const countryName = screen.getByText('Australia');
  expect(countryName).toBeDefined();
});

test('country population is rendered', () => {
  const countryPop = screen.getByText(
    sampleCountryAus.population.toLocaleString('en')
  );

  expect(countryPop).toBeDefined();
});

test('country flag is rendered', () => {
  const countryFlag = screen.getByRole('img');
  expect(countryFlag).toBeDefined();
});
