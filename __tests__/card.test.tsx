import {expect, test} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import { Dispatch, SetStateAction } from 'react';
import Card from '../components/Card';
import { sampleCountry } from '../resources/constants';

const cardProps = {
  isDark: true,
  country: sampleCountry,
  setCountry: () => {}
};

test('country name is rendered', () => {
  render(<Card {...cardProps}/>);

  const countryName = screen.getByText('Australia');
  expect(countryName).toBeDefined();
});

test('country population is rendered', () => {
  render(<Card {...cardProps}/>);

  const countryPop = screen.getByText(
    sampleCountry.population.toLocaleString('en')
  );

  expect(countryPop).toBeDefined();
});

test('country flag is rendered', () => {
  render(<Card {...cardProps}/>);

  const countryFlag = screen.getByRole('img');
  expect(countryFlag).toBeDefined();
});