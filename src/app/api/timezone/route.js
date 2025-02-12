// app/api/timezone/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'tz.json');

  try {
    // Чтение файла
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const timezones = JSON.parse(fileContent);

    // Возвращаем JSON-ответ
    return NextResponse.json(timezones);
  } catch (error) {
    // Логируем ошибку для отладки
    console.error('Ошибка при чтении файла:', error);

    // Возвращаем ошибку 500 с описанием
    return NextResponse.json(
      { error: 'Не удалось загрузить данные', details: error.message },
      { status: 500 }
    );
  }
}
