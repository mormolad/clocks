// Функция для получения текущего часового пояса пользователя
const getUserTimezone = () => {
  const timezoneOffsetMinutes = new Date().getTimezoneOffset(); // Смещение в минутах
  const timezoneOffsetHours = -timezoneOffsetMinutes / 60; // Преобразуем в часы
  return timezoneOffsetHours;
};

//Получить текущий город
const getCurrentCity = (timezones: { name: string; timezone: number }[]) => {
  const userTimeZoneOffset = -new Date().getTimezoneOffset() / 60; // Получаем смещение пользователя
  return (
    timezones.find((tz) => tz.timezone == userTimeZoneOffset)?.name || 'Город не найден'
  );
};

export { getUserTimezone, getCurrentCity };
