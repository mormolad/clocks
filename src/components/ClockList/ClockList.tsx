import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClock, removeClock } from '../../store/reducers';
import { AppDispatch, RootState } from '../../store/store';
import Loader from '../Loader/Loader';
import ClockItem from '../ClockItem/ClockItem'; // Импортируем новый компонент
import styles from './style.module.css';
import { getUserTimezone, getCurrentCity } from '@/utils/utils';

const ClockList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clocks = useSelector((state: RootState) => state.clock.clocks);
  const loading = useSelector((state: RootState) => state.clock.loading);
  const [date, setDate] = React.useState(Date.now());
  const timezones = useSelector((state: RootState) => state.clock.timezones);

  // Добавление новых часов с часовым поясом
  const handleAddClock = () => {
    if (clocks.length < 10) {
      const newClockId = Date.now();
      dispatch(
        addClock({
          id: newClockId,
          timezone: getUserTimezone(), // Получаем часовой пояс пользователя
          city: getCurrentCity(timezones), //Получаем город
        })
      );
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
            <button className={styles.button} onClick={handleAddClock}>
              Добавить часы
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ClockList;
