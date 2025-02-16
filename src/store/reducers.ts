import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс для отдельных часов
interface Clock {
  id: number;
  timezone: number;
  city: string;
}

// Интерфейс для состояния
interface ClockState {
  clocks: Clock[];
  loading: boolean;
  timezones: { name: string; timezone: number }[];
}

// Начальное состояние
const initialState: ClockState = {
  clocks: [],
  loading: true,
  timezones: [{ name: '', timezone: 0 }],
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
      action: PayloadAction<{ id: number; timezone: number }>
    ) => {
      const clock = state.clocks.find(
        (clock) => clock.id === action.payload.id
      );
      if (clock) {
        clock.timezone = action.payload.timezone;
      }
    },
    // Установка списка часовых поясов
    setTimezones: (
      state: ClockState,
      action: PayloadAction<{ name: string; timezone: number }[]>
    ) => {
      state.timezones = action.payload;
      state.loading = false;
    },
  },
});

// Экспорт действий и редюсера
export const { addClock, removeClock, setTimezone, setTimezones } =
  clockSlice.actions;
export default clockSlice.reducer;
