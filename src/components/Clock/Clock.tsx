import React, { useEffect, useRef } from 'react';
import { ClockProps } from '@/types/types';

const Clock: React.FC<ClockProps> = ({ unixTime }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Функция для рисования меток часов (1-12) в неоновом стиле
  const drawNumbers = (ctx: CanvasRenderingContext2D, radius: number) => {
    ctx.font = `${radius * 0.13}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#00ff00'; // Неоново-зелёный цвет
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ff00'; // Свечение зелёного цвета

    for (let num = 1; num <= 12; num++) {
      const angle = (num * Math.PI) / 6;
      ctx.rotate(angle);
      ctx.translate(0, -radius * 0.83);
      ctx.rotate(-angle);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(angle);
      ctx.translate(0, radius * 0.83);
      ctx.rotate(-angle);
    }
  };

  // Функция для рисования циферблата в неоновом стиле
  const drawFace = (ctx: CanvasRenderingContext2D, radius: number) => {
    // Рисуем фон циферблата
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
    ctx.fillStyle = '#000'; // Чёрный фон
    ctx.fill();

    // Градиент для свечения
    const grad = ctx.createRadialGradient(
      0,
      0,
      radius * 0.9,
      0,
      0,
      radius * 1.0
    );
    grad.addColorStop(0, '#00ffff'); // Неоново-голубой
    grad.addColorStop(0.5, '#000'); // Чёрный
    grad.addColorStop(1, '#ff00ff'); // Неоново-розовый

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00ffff'; // Свечение голубого цвета
    ctx.stroke();

    // Центр циферблата
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#ff00ff'; // Неоново-розовый
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00ff'; // Свечение розового цвета
    ctx.fill();

    drawNumbers(ctx, radius); // Добавляем метки часов
  };

  // Функция для рисования стрелок в неоновом стиле
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
    ctx.shadowBlur = 10;
    ctx.shadowColor = color; // Свечение цвета стрелки
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  };

  // Рисуем часы
  const drawClock = (currentTime: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const date = new Date(currentTime); // Используем текущее время
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
    drawHand(ctx, secondsAngle, radius * 0.85, radius * 0.02, '#00ffff'); // Секундная стрелка (голубая)
    drawHand(ctx, minutesAngle, radius * 0.8, radius * 0.04, '#ff00ff'); // Минутная стрелка (розовая)
    drawHand(ctx, hoursAngle, radius * 0.4, radius * 0.06, '#00ff00'); // Часовая стрелка (зелёная)

    ctx.restore();
  };

  // Перерисовываем часы каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now(); // Используем текущее время
      drawClock(currentTime);
    }, 1000); // Перерисовываем каждую секунду

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, []); // Пустой массив зависимостей, чтобы интервал создавался только один раз

  return <canvas ref={canvasRef} height="200" width="200"></canvas>;
};

export default Clock;
