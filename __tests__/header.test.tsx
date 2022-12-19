import {expect, test} from '@jest/globals';
import {fireEvent, getByText, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SetStateAction } from 'react';
import Header from '../components/Header';

const headerProps = {
  isDark: true,
  setIsDark: jest.fn((fn: SetStateAction<boolean>) => {}),
}

beforeEach(() => {
  render(<Header {...headerProps}/>);
});

test('title is rendered', () => {
  const title = screen.getByText('Where in the world?');
  expect(title).toBeDefined();
});

test('dark mode button is rendered', () => {
  const button = screen.getByRole('button');
  expect(button).toBeDefined();
});

test('dark mode button calls setIsDark when fired', () => {  
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(headerProps.setIsDark).toBeCalled();
});
