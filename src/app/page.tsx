// 'use client';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { setTimezones } from '../store/reducers';
// import ClockList from '../components/ClockList/ClockList';
// import LoadingIndicator from '../components/Loader/Loader';
// import { AppDispatch, RootState } from '../store/store';
// import styles from './style.module.css';
// import { getTimezone } from './api/api';

// const Home: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const loading = useSelector((state: RootState) => state.clock.loading);

//   async function loadTimezones() {
//     try {
//       const timezones = await getTimezone();
//       dispatch(setTimezones(timezones));
//       // const response = await axios.get('/api/'); // Выполняем запрос к API Route
//       // dispatch(setTimezones(response.data)); // Сохраняем данные в Redux store
//     } catch (error) {
//       console.error('Ошибка загрузки данных:', error);
//     }
//   }

//   useEffect(() => {
//     loadTimezones();
//   }, [dispatch]);

//   return (
//     <div className={styles.app}>
//       <h1>Часы в разных часовых поясах</h1>
//       {loading ? <LoadingIndicator /> : <ClockList />}
//     </div>
//   );
// };

// export default Home;
'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setTimezones } from '../store/reducers';
import ClockList from '../components/ClockList/ClockList';
import LoadingIndicator from '../components/Loader/Loader';
import { AppDispatch, RootState } from '../store/store';
import { getTimezone } from './api/api';
import styles from './style.module.css';
const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.clock.loading);

  async function loadTimezones() {
    try {
      const timezones = await getTimezone();
      dispatch(setTimezones(timezones));
      // const response = await axios.get('/api/'); // Выполняем запрос к API Route
      // dispatch(setTimezones(response.data)); // Сохраняем данные в Redux store
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  }
  useEffect(() => {
    loadTimezones();
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <h1>Часы в разных часовых поясах</h1>
      {loading ? <LoadingIndicator /> : <ClockList />}
    </div>
  );
};

export default Home;
