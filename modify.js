const xlsx = require('xlsx');

const workbook = xlsx.readFile('scores.xlsx'); // --> nombre del archivo a leer
const worksheet = workbook.Sheets['Sheet1']; // --> nombre de la hoja de trabajo

const range = xlsx.utils.decode_range(worksheet['!ref']); // --> selecciona las celdas en nuestro archivo

// Loopear sobre cada celda/estudiante en nuestro worksheet
for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  const highSchool = worksheet[xlsx.utils.encode_cell({ r: rowNum, c: 1 })].v; // -->

  // Dar 30 puntos para estudiantes de Lead Paint HS
  if (highSchool === 'Lead Paint HS') {
    worksheet[xlsx.utils.encode_cell({ r: rowNum, c: 3 })].v += 30;
  }
}
