import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimezone } from '../../store/reducers';
import { AppDispatch, RootState } from '../../store/store';
import { TimezoneSelectorProps } from '../../types/types';

const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({ clockId }) => {
  //Получить текущий город
  const getCurrentCity = (timezones: { name: string; timezone: number }[]) => {
    const userTimeZoneOffset = -new Date().getTimezoneOffset() / 60; // Получаем смещение пользователя
    return (
      timezones.find((tz) => tz.timezone == userTimeZoneOffset)?.name || 'UTC'
    );
  };

  const dispatch = useDispatch<AppDispatch>();
  // Получаем данные из Redux
  const clocks = useSelector((state: RootState) => state.clock.clocks);
  const selectedClock = useSelector((state: RootState) =>
    state.clock.clocks.find((clock) => clock.id === clockId)
  );
  const timezones = useSelector((state: RootState) => state.clock.timezones);
  const [availableTimezones, setAvailableTimezones] = React.useState(timezones);
  const [currentCity, setCurrentCity] = React.useState(
    getCurrentCity(timezones)
  );

  // Мемоизация доступных часовых поясов
  useEffect(() => {
    setAvailableTimezones(
      timezones.filter(
        (tz) => !clocks.some((clock) => clock.timezone === tz.timezone * 1)
      )
    );
  }, [clocks, timezones, clockId]);

  // Обработчик изменения часового пояса
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCityName = event.target.value;
    setCurrentCity(event.target.value);
    // Находим часовой пояс по названию города
    const newTimezone = timezones.find((tz) => tz.name === newCityName);
    if (newTimezone) {
      dispatch(
        setTimezone({
          id: clockId,
          timezone: newTimezone.timezone,
          city: newTimezone.name,
        })
      );
    }
  };

  return (
    <select value={selectedClock?.city || ''} onChange={handleChange}>
      <option value={currentCity} disabled>
        {currentCity}
      </option>
      {availableTimezones.map((tz) => (
        <option key={tz.name} value={tz.name}>
          {tz.name}
        </option>
      ))}
    </select>
  );
};

export default TimezoneSelector;
