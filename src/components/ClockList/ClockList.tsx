import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Clock from '../Clock/Clock';
import TimezoneSelector from '../TimezoneSelector/TimezoneSelector';
import { addClock, removeClock } from '../../store/reducers';
import { AppDispatch, RootState } from '../../store/store';
import Loader from '../Loader/Loader';
import styles from './style.module.css';

const ClockList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clocks = useSelector((state: RootState) => state.clock.clocks);
  const loading = useSelector((state: RootState) => state.clock.loading);
  const [date, setDate] = React.useState(new Date());

  // Функция для получения текущего часового пояса пользователя
  const getUserTimeZone = (): string => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
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
      setDate(new Date());
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
              <div key={clock.id} className={styles.container_clock}>
                <Clock clockId={clock.id} date={date} />
                <TimezoneSelector clockId={clock.id} />
                <button onClick={() => handleRemoveClock(clock.id)}>
                  Удалить
                </button>
              </div>
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
