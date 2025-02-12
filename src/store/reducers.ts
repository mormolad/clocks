import { createSlice } from '@reduxjs/toolkit';

interface Clock {
  id: number;
  timezone: string;
}

interface ClockState {
  clocks: Clock[];
  loading: boolean;
  timezones: { name: string; timezone: string }[];
}

const initialState: ClockState = {
  clocks: [],
  loading: true,
  timezones: [{ name: '', timezone: '' }],
};

const clockSlice = createSlice({
  name: 'clocks',
  initialState,
  reducers: {
    addClock: (state, action) => {
      state.clocks.push({
        id: action.payload.id,
        timezone: action.payload.timezone,
      });
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
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Clock {
//   id: number;
//   timezone?: string;
// }

// interface ClockState {
//   clocks: Clock[];
//   loading: boolean;
//   timezones: Timezones;
// }

// interface Timezones {
//   timezone: string;
//   name: string;
// }
// [];

// const initialState: ClockState = {
//   clocks: [],
//   loading: true,
//   timezones: { name: '', timezone: '' },
// };

// const clockSlice = createSlice({
//   name: 'clocks',
//   initialState,
//   reducers: {
//     addClock: (state, action: PayloadAction<{ id: number }>) => {
//       state.clocks.push({ id: action.payload.id });
//     },
//     removeClock: (state, action: PayloadAction<{ id: number }>) => {
//       state.clocks = state.clocks.filter(
//         (clock) => clock.id !== action.payload.id
//       );
//     },
//     setTimezone: (
//       state,
//       action: PayloadAction<{ id: number; timezone: string }>
//     ) => {
//       console.log(state.clocks.find((clock) => clock.id === action.payload.id));
//       const clock = state.clocks.find(
//         (clock) => clock.id === action.payload.id
//       );
//       if (clock) {
//         clock.timezone = action.payload.timezone;
//       }
//     },
//     setTimezones: (state, action: PayloadAction<{ timezones: Timezones }>) => {
//       state.timezones = action.payload.timezones;
//       state.loading = false;
//     },
//   },
// });

// export const { addClock, removeClock, setTimezone, setTimezones } =
//   clockSlice.actions;

// export const selectClocks = (state: { clocks: ClockState }) =>
//   state.clocks.clocks;
// export const selectTimezones = (state: { clocks: ClockState }) =>
//   state.clocks.timezones;
// export const selectLoading = (state: { clocks: ClockState }) =>
//   state.clocks.loading;

// export default clockSlice.reducer;
