import {expect, test} from '@jest/globals'; 
import { fireEvent, render, screen } from '@testing-library/react';
import CountryView from '../components/CountryView';
import { break1080, sampleCountryGbr, sampleCountryIrl } from '../resources/constants';

const countryViewProps = {
  isDark: true,
  country: sampleCountryIrl,
  setCountry: jest.fn(() => {}),
  countriesList: [sampleCountryGbr],
  winWidth: break1080
};

beforeEach(() => {
  render(<CountryView {...countryViewProps}/>);
})

test('country name rendered', () => {
  expect(screen.getByText('Ireland')).toBeDefined();
});

test('country popuation is rendered', () => {
  const countryPop = screen.getByText(
    sampleCountryIrl.population.toLocaleString('en')
  );
  expect(countryPop).toBeDefined();
});

test('country flag is rendered', () => {
  const countryFlags = screen.getAllByRole<HTMLImageElement>('img');
  const countryFlag = countryFlags.filter(
    (img) => img.src === sampleCountryIrl.flags.svg
  )[0];

  expect(countryFlag).toBeDefined();
});

test('native name is rendered', () => {
  const nativeName = screen.getByText(sampleCountryIrl.nativeName);
  expect(nativeName).toBeDefined();
});

test('subregion is rendered', () => {
  const subregion = screen.getByText(sampleCountryIrl.nativeName);
  expect(subregion).toBeDefined();
});

test('button for neighbouring country is rendered', () => {
  const neighbour = screen.getByText(/^United/);
  expect(neighbour).toBeDefined();
});

test('firing back button calls setCountry', () => {
  const backBtn = screen.getByText('Back');
  fireEvent.click(backBtn);
  expect(countryViewProps.setCountry).toBeCalled();
});
