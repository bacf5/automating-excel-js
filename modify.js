const xlsx = require('xlsx');

const workbook = xlsx.readFile('scores.xlsx'); // --> nombre del archivo a leer
const worksheet = workbook.Sheets['Sheet1']; // --> nombre de la hoja de trabajo

const range = xlsx.utils.decode_range(worksheet['!ref']); // --> selecciona las celdas en nuestro archivo [columnas y celdas]

// Loopear sobre cada celda/estudiante en nuestro worksheet
for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  const highSchool = worksheet[xlsx.utils.encode_cell({ r: rowNum, c: 1 })].v; // --> Agarra el value "[].v" de cada celda para poder manipularlo

  // Dar 30 puntos en el "test 2" para estudiantes de Lead Paint HS [Recordar que es 0 index]
  if (highSchool === 'Lead Paint HS') {
    worksheet[xlsx.utils.encode_cell({ r: rowNum, c: 3 })].v += 30;
  }
}

const newWb = xlsx.utils.book_new(); // --> Crea un nuevo workbook
xlsx.utils.book_append_sheet(newWb, worksheet, 'Sheet1'); // --> Genera un sheet en ese workbook
xlsx.writeFile(newWb, 'scoresWithCurve.xlsx'); // --> Guarda el nuevo workbook
