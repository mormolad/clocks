import { createSlice } from '@reduxjs/toolkit';

interface Clock {
  id: number;
  timezone?: string;
}

interface ClockState {
  clocks: Clock[];
  loading: boolean;
  timezones: string[];
}

const initialState: ClockState = {
  clocks: [],
  loading: true,
  timezones: [],
};

const clockSlice = createSlice({
  name: 'clocks',
  initialState,
  reducers: {
    addClock: (state, action) => {
      state.clocks.push({ id: action.payload.id });
    },
    removeClock: (state, action) => {
      state.clocks = state.clocks.filter(
        (clock) => clock.id !== action.payload.id
      );
    },
    setTimezone: (state, action) => {
      const clock = state.clocks.find(
        (clock) => clock.id === action.payload.id
      );
      if (clock) {
        clock.timezone = action.payload.timezone;
      }
    },
    setTimezones: (state, action) => {
      state.timezones = action.payload;
      state.loading = false;
    },
  },
});

export const { addClock, removeClock, setTimezone, setTimezones } =
  clockSlice.actions;
export default clockSlice.reducer;
