import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  celsius: '',
  fahrenheit: ''
};

const tempSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {
    setCelsius(state, action) {
      state.celsius = action.payload;
      state.fahrenheit = (action.payload * 9 / 5) + 32;
    },
    setFahrenheit(state, action) {
      state.fahrenheit = action.payload;
      state.celsius = (action.payload - 32) * 5 / 9;
    }
  }
});

export const { setCelsius, setFahrenheit } = tempSlice.actions;
export default tempSlice.reducer;