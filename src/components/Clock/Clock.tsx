import React, { useEffect, useRef } from 'react';

interface ClockProps {
  unixTime: number; // Принимаем Unix-время
}

const Clock: React.FC<ClockProps> = ({ unixTime }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Преобразуем Unix-время в объект Date
  const date = new Date(unixTime);
  // Рассчитываем углы стрелок
  const secondsAngle = (date.getSeconds() * Math.PI) / 30;
  const minutesAngle =
    (date.getMinutes() * Math.PI) / 30 + (date.getSeconds() * Math.PI) / 1800;
  const hoursAngle =
    ((date.getHours() % 12) * Math.PI) / 6 +
    (date.getMinutes() * Math.PI) / 360 +
    (date.getSeconds() * Math.PI) / 21600;

  // Функция для рисования меток часов (1-12)
  const drawNumbers = (ctx: CanvasRenderingContext2D, radius: number) => {
    ctx.font = `${radius * 0.13}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
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

  // Рисуем часы
  const drawClock = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const radius = canvasRef.current.height / 2;
    ctx.save();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.translate(radius, radius);

    // Рисуем циферблат и стрелки
    drawFace(ctx, radius);
    drawHand(ctx, secondsAngle, radius * 0.85, radius * 0.02); // Секундная стрелка
    drawHand(ctx, minutesAngle, radius * 0.8, radius * 0.04); // Минутная стрелка
    drawHand(ctx, hoursAngle, radius * 0.4, radius * 0.06); // Часовая стрелка

    ctx.restore();
  };

  // Перерисовываем часы при изменении `unixTime`
  useEffect(() => {
    drawClock();
  }, [unixTime]);

  return <canvas ref={canvasRef} height="200" width="200"></canvas>;
};

export default Clock;
