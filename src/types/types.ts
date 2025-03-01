// Интерфейс для отдельных часов
export interface Clock {
  id: number;
  timezone: number;
  city: string;
}

// Интерфейс для часового пояса
export interface Timezone {
  name: string;
  timezone: number;
}

// Интерфейс для состояния
export interface ClockState {
  clocks: Clock[];
  loading: boolean;
  timezones: Timezone[];
}

export interface TimezonesJson {
  name: string;
  timezone: string;
}

export interface ClockProps {
  unixTime: number; // Принимаем Unix-время
}

export interface ClockItemProps {
  clockId: number;
  unixTime: number; // Время в Unix-формате (миллисекунды)
  onRemove: (id: number) => void;
}

export interface TimezoneSelectorProps {
  clockId: number;
}
