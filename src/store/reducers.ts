import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClockState, Timezone } from '@/types/types';

// Начальное состояние
const initialState: ClockState = {
  clocks: [],
  loading: true,
  timezones: [],
};

// Создание среза
const clockSlice = createSlice({
  name: 'clocks',
  initialState,
  reducers: {
    // Добавление новых часов
    addClock: (
      state: ClockState,
      action: PayloadAction<{
        id: number;
        timezone: number;
        city: string;
      }>
    ) => {
      state.clocks.push({
        id: action.payload.id,
        timezone: action.payload.timezone,
        city: action.payload.city,
      });
    },
    // Удаление часов
    removeClock: (state: ClockState, action: PayloadAction<{ id: number }>) => {
      state.clocks = state.clocks.filter(
        (clock) => clock.id !== action.payload.id
      );
    },
    // Установка часового пояса для конкретных часов
    setTimezone: (
      state: ClockState,
      action: PayloadAction<{ id: number; timezone: number; city: string }>
    ) => {
      const clock = state.clocks.find(
        (clock) => clock.id === action.payload.id
      );
      if (clock) {
        clock.timezone = action.payload.timezone;
        clock.city = action.payload.city;
      }
    },
    // Установка списка часовых поясов
    setTimezones: (state: ClockState, action: PayloadAction<Timezone[]>) => {
      state.timezones = action.payload;
      state.loading = false;
    },
  },
});

// Экспорт действий и редюсера
export const { addClock, removeClock, setTimezone, setTimezones } =
  clockSlice.actions;
export default clockSlice.reducer;
