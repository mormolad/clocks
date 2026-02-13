import React, { useEffect, useRef } from 'react';
import { ClockProps } from '@/types/types';

const Clock: React.FC<ClockProps> = ({ unixTime }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Функция для рисования меток часов (1-12) в стиле Rolex
  const drawNumbers = (ctx: CanvasRenderingContext2D, radius: number) => {
    ctx.font = `${radius * 0.12}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff'; // Белый цвет для текста

    // Рисуем треугольник на 12 часах
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.8);
    ctx.lineTo(-radius * 0.05, -radius * 0.9);
    ctx.lineTo(radius * 0.05, -radius * 0.9);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Рисуем метки для остальных часов
    for (let num = 1; num <= 12; num++) {
      if (num === 12) continue; // Пропускаем 12, так как уже нарисовали треугольник
      const angle = (num * Math.PI) / 6;
      ctx.rotate(angle);
      ctx.translate(0, -radius * 0.8);
      ctx.rotate(-angle);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(angle);
      ctx.translate(0, radius * 0.8);
      ctx.rotate(-angle);
    }
  };

  // Функция для рисования циферблата в стиле Rolex
  const drawFace = (ctx: CanvasRenderingContext2D, radius: number) => {
    // Рисуем фон циферблата
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
    ctx.fillStyle = '#0a8efa'; // Синий фон
    ctx.fill();

    // Ободок циферблата
    ctx.strokeStyle = '#cccccc'; // Серебристый
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    // Центр циферблата
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff'; // Серебристый
    ctx.fill();

    // "Torgbox"
    ctx.font = `${radius * 0.2}px Arial`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center'; // Выравнивание по центру
    ctx.fillText('Антон', 0, -radius * 0.4);

    // "Ваш бизнес-помощник"
    ctx.font = `${radius * 0.1}px Arial`;
    ctx.fillText('Вэб-разработчик', 0, -radius * 0.25);

    drawNumbers(ctx, radius); // Добавляем метки часов
  };

  // Функция для рисования стрелок
  const drawHand = (
    ctx: CanvasRenderingContext2D,
    pos: number,
    length: number,
    width: number,
    color: string
  ) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  };

  // Рисуем часы
  const drawClock = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const date = new Date(unixTime); // Используем переданное unixTime
    const secondsAngle = (date.getSeconds() * Math.PI) / 30;
    const minutesAngle =
      (date.getMinutes() * Math.PI) / 30 + (date.getSeconds() * Math.PI) / 1800;
    const hoursAngle =
      ((date.getHours() % 12) * Math.PI) / 6 +
      (date.getMinutes() * Math.PI) / 360 +
      (date.getSeconds() * Math.PI) / 21600;

    const radius = canvasRef.current.height / 2;
    ctx.save();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.translate(radius, radius);

    // Рисуем циферблат и стрелки
    drawFace(ctx, radius);
    drawHand(ctx, secondsAngle, radius * 0.85, radius * 0.02, '#ffffff'); // Секундная стрелка (белая)
    drawHand(ctx, minutesAngle, radius * 0.8, radius * 0.04, '#ffffff'); // Минутная стрелка (белая)
    drawHand(ctx, hoursAngle, radius * 0.4, radius * 0.06, '#ffffff'); // Часовая стрелка (белая)

    ctx.restore();
  };

  // Перерисовываем часы при изменении unixTime
  useEffect(() => {
    drawClock();
  }, [unixTime]); // Зависимость от unixTime

  return <canvas ref={canvasRef} height="200" width="200"></canvas>;
};

export default Clock;
