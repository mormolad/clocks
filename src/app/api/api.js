import timezone from '../../public/timezones.json';
export async function getTimezone() {
  return timezone;
}
//import fs from 'fs';
// import path from 'path';

// export async function GET() {
//   try {
//     const filePath = path.join(process.cwd(), 'public', 'timezones.json');
//     const jsonData = fs.readFileSync(filePath, 'utf8');
//     const data = JSON.parse(jsonData);

//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Ошибка загрузки данных:', error);
//     return new Response('Ошибка загрузки данных', { status: 500 });
//   }
// }
