const db = require('../models/seeding/Connection');
const studentRepository = require('../models/queries/StudentQuery');
const exceljs = require('exceljs')
const XLSX = require('xlsx');

const insertfromCsvFileToDatabase = async (req, res, next) => {
    const { sec_id, course_id, lecture_id } = req.params;

    const workbook = XLSX.readFile(req.files.file.tempFilePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    jsonData.map(data => {
        db.none('INSERT INTO attendance  VALUES ($1, $2, $3,$4)', [lecture_id, data.id, sec_id, course_id])
            .then(() => {
                console.log('Data inserted successfully.');
                res.end()
            })
            .catch(error => {
                console.error('Error inserting data:', error);
                res.status(500).json({message:'Error while inserting data to database',success:false});
            });
    })
}

const exportStudentsWhoAttendLessthan25Percent = async (req, res) => {
    const { course_id, sec_id } = req.params;
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    // Add column headers to the worksheet
    studentRepository.getStudentsWhoAttendLessthan25Percent(course_id, sec_id).then((data) => {
        console.log(data);
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers);
        // Add data rows to the worksheet
        data.forEach(row => {
            const values = Object.values(row);
            worksheet.addRow(values);
        });

        // Set the content type and headers for the download
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=data.xlsx'
        );

        // Stream the workbook as an Excel file to the response
        return workbook.xlsx.write(res);

    }).then(() => {
        res.end();
    })
        .catch(error => {
            // Handle any errors
            console.error(error);
            res.status(500).send('Error exporting data to Excel');
        })
}


const csvFileController = { insertfromCsvFileToDatabase, exportStudentsWhoAttendLessthan25Percent }
module.exports = csvFileController