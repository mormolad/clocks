import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimezone } from '../../store/reducers';
import { AppDispatch, RootState } from '../../store/store';

interface TimezoneSelectorProps {
  clockId: number;
}

const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({ clockId }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем данные из Redux
  const timezones = useSelector((state: RootState) => state.clock.timezones);
  const clocks = useSelector((state: RootState) => state.clock.clocks);
  const selectedClock = useSelector((state: RootState) =>
    state.clock.clocks.find((clock) => clock.id === clockId)
  );

  // Мемоизация доступных часовых поясов
  const availableTimezones = useMemo(() => {
    return timezones.filter(
      (tz) =>
        !clocks.some(
          (clock) => clock.timezone === tz.timezone && clock.id !== clockId
        )
    );
  }, [clocks, timezones, clockId]);

  // Обработчик изменения часового пояса
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimezoneName = event.target.value;

    // Находим часовой пояс по имени
    const newTimezone = timezones.find((tz) => tz.name === newTimezoneName);

    if (newTimezone) {
      dispatch(
        setTimezone({ id: clockId, timezone: newTimezone.timezone }) // Передаем timezone
      );
    }
  };

  return (
    <select value={selectedClock?.timezone || ''} onChange={handleChange}>
      <option value="" disabled>
        Выберите город
      </option>
      {availableTimezones.map((tz) => (
        <option key={tz.timezone} value={tz.name}>
          {tz.name}
        </option>
      ))}
    </select>
  );
};

export default TimezoneSelector;
