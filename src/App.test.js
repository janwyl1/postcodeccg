import React from 'react';
import { render, getByPlaceholderText } from '@testing-library/react';
import App from './App';
import Header from './Header'
import Footer from './Footer'
import PostcodeToCcg from './PostcodeToCcg';

/** Test Header Component */
test('renders Header component', () => {
  const { getByText } = render(<Header />);
  const h1 = getByText(/Postcodes to CCG/);
  expect(h1).toBeInTheDocument();
})
/** Test Footer Component */
test('renders Footer component', () => {
  const { getByText } = render(<Footer />);
  const p = getByText(/Created by James Anwyl. Data provided by Postcodes.io API/);
  expect(p).toBeInTheDocument();
})
/** Test PostcodeToCcg button Component */
test('renders PostcodeToCcg button component', () => {
  const { getByText } = render(<PostcodeToCcg />);
  const btn = getByText(/Go!/)
  expect(btn).toBeInTheDocument();
})
/** Test PostcodeToCcg textarea Component */
test('renders PostcodeToCcg textarea component', () => {
  const { getByText } = render(<PostcodeToCcg />);
  const container = document.body
  const placeholder = getByPlaceholderText(container, "Enter a comma separated list of postcodes e.g. WA1 1AA, L31 1ED...")
  expect(placeholder).toBeInTheDocument();
})
// Need to test submitting data + test data fetching util (do it in another file to save on api calls)