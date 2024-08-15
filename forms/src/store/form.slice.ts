import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  picture: string;
  country: string;
}

interface FormsState {
  controlledData: FormData | null;
  uncontrolledData: FormData | null;
}

const initialState: FormsState = {
  controlledData: null,
  uncontrolledData: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setControlledData: (state, action: PayloadAction<FormData>) => {
      state.controlledData = action.payload;
    },
    setUncontrolledData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolledData = action.payload;
    },
  },
});

export const { setControlledData, setUncontrolledData } = formSlice.actions;
