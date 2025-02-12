import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ClockProps {
  clockId: number;
  date: Date; // Время передается извне
}

const Clock: React.FC<ClockProps> = ({ clockId, date }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Получаем данные о часах из Redux
  const clock = useSelector((state: RootState) =>
    state.clock.clocks.find((clock) => clock.id === clockId)
  );

  // Функция для рисования меток часов (1-12)
  const drawNumbers = (ctx: CanvasRenderingContext2D, radius: number) => {
    ctx.font = `${radius * 0.15}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let num = 1; num <= 12; num++) {
      const angle = (num * Math.PI) / 6;
      ctx.rotate(angle);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-angle);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(angle);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-angle);
    }
  };

  // Функция для рисования циферблата
  const drawFace = (ctx: CanvasRenderingContext2D, radius: number) => {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    const grad = ctx.createRadialGradient(
      0,
      0,
      radius * 0.9,
      0,
      0,
      radius * 1.0
    );
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    drawNumbers(ctx, radius); // Добавляем метки часов
  };

  // Функция для рисования стрелок
  const drawHand = (
    ctx: CanvasRenderingContext2D,
    pos: number,
    length: number,
    width: number
  ) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  };

  // Основная функция для рисования часов
  // Основная функция для рисования часов
  // const drawClock = () => {
  //   if (!canvasRef.current) return;
  //   const ctx = canvasRef.current.getContext('2d');
  //   if (!ctx) return;

  //   const radius = canvasRef.current.height / 2;
  //   ctx.save();
  //   ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  //   ctx.translate(radius, radius);

  //   let now = new Date(date.getTime()); // Создаем копию переданного времени
  //   let hours = now.getHours();
  //   let minutes = now.getMinutes();
  //   let seconds = now.getSeconds();
  //   // Применяем временную зону, если она задана
  //   if (clock && clock.timezone) {
  //     const options: Intl.DateTimeFormatOptions = {
  //       hour: 'numeric',
  //       minute: 'numeric',
  //       second: 'numeric',
  //       timeZone: clock.timezone, // Используем временную зону из Redux
  //     };

  //     // Преобразуем время в указанном часовом поясе
  //     const formattedTime = new Intl.DateTimeFormat(
  //       'en-US',
  //       options
  //     ).formatToParts(now);

  //     // Извлекаем часы, минуты и секунды
  //     hours = parseInt(
  //       formattedTime.find((part) => part.type === 'hour')?.value || '0',
  //       10
  //     );
  //     minutes = parseInt(
  //       formattedTime.find((part) => part.type === 'minute')?.value || '0',
  //       10
  //     );
  //     seconds = parseInt(
  //       formattedTime.find((part) => part.type === 'second')?.value || '0',
  //       10
  //     );

  //     // Обновляем время
  //     now.setHours(hours, minutes, seconds, 0);
  //   }

  //   // Рассчитываем углы стрелок
  //   const secondsAngle = (seconds * Math.PI) / 30;
  //   const minutesAngle = (minutes * Math.PI) / 30 + (seconds * Math.PI) / 1800;
  //   const hoursAngle =
  //     ((hours % 12) * Math.PI) / 6 +
  //     (minutes * Math.PI) / 360 +
  //     (seconds * Math.PI) / 21600;

  //   // Рисуем циферблат и стрелки
  //   drawFace(ctx, radius);
  //   drawHand(ctx, secondsAngle, radius * 0.85, radius * 0.02); // Секундная стрелка
  //   drawHand(ctx, minutesAngle, radius * 0.7, radius * 0.04); // Минутная стрелка
  //   drawHand(ctx, hoursAngle, radius * 0.35, radius * 0.06); // Часовая стрелка

  //   ctx.restore();
  // };
  const drawClock = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const radius = canvasRef.current.height / 2;
    ctx.save();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.translate(radius, radius);

    let now = new Date(date.getTime()); // Создаем копию переданного времени

    // Применяем временную зону, если она задана
    if (clock && clock.timezone) {
      try {
        // Проверяем, является ли часовой пояс смещением (например, "+5")
        const offsetMatch = clock.timezone.match(/^([+-]?\d+)$/);

        if (offsetMatch) {
          // Парсим смещение
          const offsetHours = parseInt(offsetMatch[1], 10);

          if (isNaN(offsetHours)) {
            throw new Error(`Неверный формат смещения: ${clock.timezone}`);
          }

          // Применяем смещение к времени
          now.setUTCMinutes(now.getUTCMinutes() + offsetHours * 60);
        } else {
          console.warn(
            `Неверный формат часового пояса "${clock.timezone}". Используется UTC.`
          );
        }
      } catch (error) {
        console.error(error);
        now = new Date(date.getTime()); // Возвращаемся к исходному времени (UTC)
      }
    }

    // Рассчитываем углы стрелок
    const secondsAngle = (now.getSeconds() * Math.PI) / 30;
    const minutesAngle =
      (now.getMinutes() * Math.PI) / 30 + (now.getSeconds() * Math.PI) / 1800;
    const hoursAngle =
      ((now.getHours() % 12) * Math.PI) / 6 +
      (now.getMinutes() * Math.PI) / 360 +
      (now.getSeconds() * Math.PI) / 21600;

    // Рисуем циферблат и стрелки
    drawFace(ctx, radius);
    drawHand(ctx, secondsAngle, radius * 0.85, radius * 0.02); // Секундная стрелка
    drawHand(ctx, minutesAngle, radius * 0.7, radius * 0.04); // Минутная стрелка
    drawHand(ctx, hoursAngle, radius * 0.35, radius * 0.06); // Часовая стрелка

    ctx.restore();
  };
  // Перерисовываем часы при изменении `date` или `clock`
  useEffect(() => {
    drawClock();
  }, [date, clock]);

  return <canvas ref={canvasRef} height="200" width="200"></canvas>;
};

export default Clock;
