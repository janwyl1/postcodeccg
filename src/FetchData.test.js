import React from 'react';
import {render, fireEvent, wait} from '@testing-library/react'
import fetchData from './FetchData';
// import dummyData from './dummyData';

/** Test FetchData Component */
test('returns valid JSON object', () => {
    const mockFetchData = jest.fn()
    const testData = ["WA51QG", "L35 5DR", null, 0, "SE1 1ET"]
    mockFetchData.mockResolvedValueOnce({})
    return false;
})


test('loads greetings on click', async () => {
  const mockLoadGreeting = jest.fn()
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  const {getByLabelText, getByText} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />,
  )
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})