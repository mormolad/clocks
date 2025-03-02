'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimezones } from '../store/reducers';
import ClockList from '../components/ClockList/ClockList';
import LoadingIndicator from '../components/Loader/Loader';
import { AppDispatch, RootState } from '../store/store';
import styles from './style.module.css';
import { TimezonesJson } from '../types/types';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.clock.loading);
  const fetchTimezones = async () => {
    try {
      const response = await fetch('/api/timezone/');
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      const data: TimezonesJson[] = await response.json();

      // Преобразуем данные и диспатчим их в Redux
      dispatch(
        setTimezones(
          data.map((item) => ({
            ...item, // Копируем остальные поля объекта
            timezone: parseInt(item.timezone, 10), // Преобразуем timezone в число
          }))
        )
      );
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  useEffect(() => {
    fetchTimezones();
  }, []);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Часы в разных часовых поясах</h1>
      {loading ? <LoadingIndicator /> : <ClockList />}
    </div>
  );
};

export default Home;
