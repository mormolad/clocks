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
  useEffect(() => {
    // Загружаем данные из API-роута
    fetch('/api/timezone/')
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          setTimezones(
            data.map((item: TimezonesJson) => {
              return {
                ...item, // Копируем остальные поля объекта
                timezone: parseInt(item.timezone, 10), // Преобразуем timezone в число
              };
            })
          )
        );
      })
      .catch((error) => console.error('Ошибка загрузки данных:', error));
  }, []);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Часы в разных часовых поясах</h1>
      {loading ? <LoadingIndicator /> : <ClockList />}
    </div>
  );
};

export default Home;
