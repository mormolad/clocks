import React from 'react';
import { useSelector } from 'react-redux';
import Clock from '../Clock/Clock';
import TimezoneSelector from '../TimezoneSelector/TimezoneSelector';
import styles from './style.module.css'; // Стили для компонента
import { RootState } from '../../store/store'; // Импортируем тип RootState
import { ClockItemProps } from '../../types/types';
import { getAdjustedUnixTime } from '../../utils/utils';

const ClockItem: React.FC<ClockItemProps> = ({
  clockId,
  unixTime,
  onRemove,
}) => {
  // Получаем текущий часовой пояс для этих часов
  const clock = useSelector((state: RootState) =>
    state.clock.clocks.find((clock) => clock.id === clockId)
  );

  // Получаем скорректированное Unix-время
  const adjustedUnixTime = clock
    ? getAdjustedUnixTime(unixTime, clock.timezone)
    : unixTime;

  // Преобразуем Unix-время в объект Date только для отображения
  const adjustedDate = new Date(adjustedUnixTime);

  return clock ? (
    <div className={styles.container_clock}>
      <Clock unixTime={getAdjustedUnixTime(unixTime, clock.timezone)} />
      <div className={styles.time}>
        {`${adjustedDate.toLocaleTimeString('ru-RU', {
          hour12: false,
        })}`}
      </div>
      <TimezoneSelector clockId={clockId} />
      <button onClick={() => onRemove(clockId)}>Удалить</button>
    </div>
  ) : null;
};

export default ClockItem;
