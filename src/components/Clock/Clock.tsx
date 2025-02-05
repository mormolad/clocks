import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ClockProps {
  clockId: number;
  date: Date;
}

const Clock: React.FC<ClockProps> = ({ clockId, date }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const clock = useSelector((state: RootState) =>
    state.clock.clocks.find((clock) => clock.id === clockId)
  );

  useEffect(() => {
    const drawClock = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const radius = canvasRef.current.height / 2;

      // Сохраняем состояние контекста
      ctx.save();

      // Очищаем холст
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Перемещаем начало координат в центр холста
      ctx.translate(radius, radius);

      // Поворачиваем холст на 90 градусов против часовой стрелки
      ctx.rotate(-Math.PI / 2);

      let now = new Date();

      // Корректировка времени на выбранный часовой пояс
      if (clock && clock.timezone) {
        const offset = parseInt(clock.timezone, 10); // Смещение в часах
        now.setHours(now.getHours() + offset);
      }

      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      // Рисуем циферблат
      drawFace(ctx, radius);

      // Рисуем стрелки
      drawHand(ctx, (seconds * Math.PI) / 30, radius * 0.9, radius * 0.02); // Секундная стрелка
      drawHand(
        ctx,
        (minutes * Math.PI) / 30 + (seconds * Math.PI) / 1800,
        radius * 0.7,
        radius * 0.04
      ); // Минутная стрелка
      drawHand(
        ctx,
        ((hours % 12) * Math.PI) / 6 +
          (minutes * Math.PI) / 360 +
          (seconds * Math.PI) / 21600,
        radius * 0.5,
        radius * 0.06
      ); // Часовая стрелка

      // Восстанавливаем состояние контекста
      ctx.restore();
    };

    drawClock();
  }, [date, clock]);

  const drawFace = (ctx: CanvasRenderingContext2D, radius: number) => {
    // Рисуем внешний круг (циферблат)
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Создаем градиент для обводки
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

    // Рисуем центральный кружок
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  };

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

  return <canvas ref={canvasRef} height="200" width="200"></canvas>;
};

export default Clock;
