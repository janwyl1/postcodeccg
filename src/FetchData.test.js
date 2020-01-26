import React from 'react';
import {render, fireEvent, wait} from '@testing-library/react'
import fetchData from './FetchData';
import dummyData from './dummyData';

/** Test FetchData Component */
test('returns valid JSON object', async () => {
	const url = 'https://api.postcodes.io/postcodes/'
    const testData = ["WA51QG", "L35 5DR", null, 0, "SE1 1ET"]
	const res = await fetchData(url, testData)
	console.log(res);
	res.json();
	expect(res.status).toEqual(200)
	expect(res.result.length).not.toBe(0);
	expect(res.body).to.be.an('object');
})