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
    timezones.find((tz) => tz.timezone == userTimeZoneOffset)?.name ||
    'Город не найден'
  );
};
// Функция для корректировки Unix-времени с учетом часового пояса
const getAdjustedUnixTime = (
  unixTime: number,
  timezoneOffset: number | undefined
): number => {
  // Преобразуем смещение часового пояса в число (часы)
  if (!timezoneOffset) {
    return unixTime; // Если смещение нет, возвращаем исходное время
  } else {
    // Получаем текущее смещение часового пояса пользователя (в минутах)
    const userOffsetMinutes = new Date().getTimezoneOffset();

    // Преобразуем смещение пользователя в часы
    const userOffsetHours = -userOffsetMinutes / 60;

    // Вычисляем разницу между целевым смещением и текущим смещением пользователя
    const offsetDifferenceHours = timezoneOffset - userOffsetHours;

    // Конвертируем разницу в миллисекунды и корректируем Unix-время
    const offsetDifferenceMilliseconds = offsetDifferenceHours * 60 * 60 * 1000;
    return unixTime + offsetDifferenceMilliseconds;
  }
};

export { getUserTimezone, getCurrentCity, getAdjustedUnixTime };
