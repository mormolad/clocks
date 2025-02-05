// import React, { useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setTimezone } from '../../store/reducers';
// import { AppDispatch, RootState } from '../../store/store';

// interface TimezoneSelectorProps {
//   clockId: number;
// }

// const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({ clockId }) => {
//   console.log(clockId);
//   const dispatch = useDispatch<AppDispatch>();
//   const timezones = useSelector((state: RootState) => state.clock.timezones);
//   const clocks = useSelector((state: RootState) => state.clock.clocks);
//   const selectedClock = useSelector((state: RootState) =>
//     state.clock.clocks.find((clock) => clock.id === clockId)
//   );

//   // Мемоизация доступных часовых поясов
//   const availableTimezones = useMemo(() => {
//     return timezones.filter(
//       (timezone) =>
//         !clocks.some(
//           (clock) => clock.timezone === timezone && clock.id !== clockId
//         )
//     );
//   }, [clocks, timezones, clockId]);

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newTimezone = event.target.value;
//     if (newTimezone && availableTimezones.includes(newTimezone)) {
//       dispatch(setTimezone({ id: clockId, timezone: newTimezone }));
//     }
//   };

//   return (
//     <select value={selectedClock?.timezone || ''} onChange={handleChange}>
//       <option value="">Выберите город</option>
//       {availableTimezones.map((timezone, i) => (
//         <option key={Date.now() * i} value={timezone}>
//           {timezone}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default TimezoneSelector;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimezone } from '../../store/reducers';
import { RootState, AppDispatch } from '../../store/store';

interface TimezoneSelectorProps {
  clockId: number;
}

const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({ clockId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const timezones = useSelector((state: RootState) => state.clock.timezones);
  const clocks = useSelector((state: RootState) => state.clock.clocks);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTimezone({ id: clockId, timezone: event.target.value }));
  };

  const availableTimezones = timezones.filter(
    (timezone) =>
      !clocks.some(
        (clock) => clock.timezone === timezone && clock.id !== clockId
      )
  );

  return (
    <select
      value={clocks.find((clock) => clock.id === clockId)?.timezone || ''}
      onChange={handleChange}
    >
      <option value="">Выберите город</option>
      {availableTimezones.map((timezone, i) => (
        <option key={timezone + i} value={`${timezone.name}`}>
          {`${timezone.name}`}
        </option>
      ))}
    </select>
  );
};

export default TimezoneSelector;
