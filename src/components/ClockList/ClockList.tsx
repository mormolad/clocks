import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClock, removeClock } from '../../store/reducers';
import { AppDispatch, RootState } from '../../store/store';
import Loader from '../Loader/Loader';
import ClockItem from '../ClockItem/ClockItem'; // Импортируем новый компонент
import styles from './style.module.css';

const ClockList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clocks = useSelector((state: RootState) => state.clock.clocks);
  const loading = useSelector((state: RootState) => state.clock.loading);
  const [date, setDate] = React.useState(Date.now());

  // Функция для получения текущего часового пояса пользователя
  const getUserTimeZone = () => {
    const timezoneOffsetMinutes = new Date().getTimezoneOffset(); // Смещение в минутах
    const timezoneOffsetHours = -timezoneOffsetMinutes / 60; // Преобразуем в часы
    return timezoneOffsetHours;
  };

  // Добавление новых часов с часовым поясом
  const handleAddClock = () => {
    if (clocks.length < 10) {
      const newClockId = Date.now();
      const userTimeZone = getUserTimeZone(); // Получаем часовой пояс пользователя
      dispatch(addClock({ id: newClockId, timezone: userTimeZone }));
    }
  };

  // Удаление часов
  const handleRemoveClock = (id: number) => {
    dispatch(removeClock({ id }));
  };

  // Обновление времени каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.container_clocks}>
            {clocks.map((clock) => (
              <ClockItem
                key={clock.id}
                clockId={clock.id}
                unixTime={date}
                onRemove={handleRemoveClock}
              />
            ))}
          </div>
          {clocks.length < 10 && (
            <button onClick={handleAddClock}>Добавить часы</button>
          )}
        </>
      )}
    </>
  );
};

export default ClockList;
