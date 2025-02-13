import React from 'react';
import { useSelector } from 'react-redux';
import Clock from '../Clock/Clock';
import TimezoneSelector from '../TimezoneSelector/TimezoneSelector';
import styles from './style.module.css'; // Стили для компонента
import { RootState } from '../../store/store'; // Импортируем тип RootState

interface ClockItemProps {
  clockId: number;
  unixTime: number; // Время в Unix-формате (миллисекунды)
  onRemove: (id: number) => void;
}

const ClockItem: React.FC<ClockItemProps> = ({
  clockId,
  unixTime,
  onRemove,
}) => {
  // Получаем текущий часовой пояс для этих часов
  const clock = useSelector((state: RootState) =>
    state.clock.clocks.find((clock) => clock.id === clockId)
  );
  // Функция для корректировки Unix-времени с учетом часового пояса
  const getAdjustedUnixTime = (
    unixTime: number,
    timezoneOffset: string
  ): number => {
    // Преобразуем смещение часового пояса в число (часы)
    const targetOffsetHours = parseInt(timezoneOffset, 10);
    if (isNaN(targetOffsetHours)) {
      return unixTime; // Если смещение невалидно, возвращаем исходное время
    }

    // Получаем текущее смещение часового пояса пользователя (в минутах)
    const userOffsetMinutes = new Date().getTimezoneOffset();

    // Преобразуем смещение пользователя в часы
    const userOffsetHours = -userOffsetMinutes / 60;

    // Вычисляем разницу между целевым смещением и текущим смещением пользователя
    const offsetDifferenceHours = targetOffsetHours - userOffsetHours;

    // Конвертируем разницу в миллисекунды и корректируем Unix-время
    const offsetDifferenceMilliseconds = offsetDifferenceHours * 60 * 60 * 1000;
    return unixTime + offsetDifferenceMilliseconds;
  };

  // Получаем скорректированное Unix-время
  const adjustedUnixTime = clock
    ? getAdjustedUnixTime(unixTime, clock.timezone)
    : unixTime;

  // Преобразуем Unix-время в объект Date только для отображения
  const adjustedDate = new Date(adjustedUnixTime);

  return (
    <div className={styles.container_clock}>
      <Clock clockId={clockId} unixTime={unixTime} />
      <div className={styles.time}>
        {`${adjustedDate.toLocaleTimeString('ru-RU', {
          hour12: false,
        })}`}
      </div>
      <TimezoneSelector clockId={clockId} />
      <button onClick={() => onRemove(clockId)}>Удалить</button>
    </div>
  );
};

export default ClockItem;
