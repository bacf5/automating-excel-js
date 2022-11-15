const xlsx = require('xlsx');

const workbook = xlsx.readFile('scores.xlsx'); // --> nombre del archivo a leer
const worksheet = workbook.Sheets['Sheet1']; // --> nombre de la hoja de trabajo

const arrStudents = xlsx.utils.sheet_to_json(worksheet);
const highSchoolData = {}; // {highSchool: {numStudents: 0, cumalativeScore: 0}}

// Fill out highSchoolData

for (const student of arrStudents) {
  const highSchool = student['High School'];
  const studentAverage = student['Average'];

  if (highSchool in highSchoolData === false) {
    highSchoolData[highSchool] = { numStudents: 0, cumalativeScore: 0 };
  }

  highSchoolData[highSchool].numStudents += 1;
  highSchoolData[highSchool].cumalativeScore += studentAverage;
}

// log out average score for each high school using highSchoolData
for (const highSchool of Object.keys(highSchoolData)) {
  const highSchoolAverage =
    highSchoolData[highSchool].cumalativeScore /
    highSchoolData[highSchool].numStudents;

  console.log(`The average score for ${highSchool} is ${highSchoolAverage}`);
}
