import React from 'react';
import { render, getByPlaceholderText } from '@testing-library/react';
import App from './App';
import Header from './Header'
import Footer from './Footer'
import PostcodeToCcg from './PostcodeToCcg';;

/** Test Header Component */
test('renders Header component', () => {
  const { getByText } = render(<Header />);
  const h1 = getByText(/Postcode to CCG/);
  expect(h1).toBeInTheDocument();
})
/** Test Footer Component */
test('renders Footer component', () => {
  const { getByText } = render(<Footer />);
  const p = getByText(/Created by James Anwyl. Data provided by Postcodes.io API/);
  expect(p).toBeInTheDocument();
})
/** Test PostcodeToCcg button Component */
describe('renders PostcodeToCcg button component', () => {
    it('render button', () => {
      const { getByText } = render(<PostcodeToCcg />);
      const btn = getByText(/Go!/)
      expect(btn).toBeInTheDocument();
    })
    it('renders textarea', () => {
      const { getByText } = render(<PostcodeToCcg />);
      const container = document.body
      const placeholder = getByPlaceholderText(container, "Enter a comma separated list of postcodes e.g. WA1 1AA, L31 1ED...")
      expect(placeholder).toBeInTheDocument();
    })

})