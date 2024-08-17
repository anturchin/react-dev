import { createSlice } from '@reduxjs/toolkit';

import { countries } from '../constants/countries.ts';

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: countries,
  reducers: {},
});
