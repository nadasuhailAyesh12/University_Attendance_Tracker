const fs = require('fs')
const { join } = require('path')
const csv = require('csv-parser');
const db = require('../models/seeding/Connection');
const studentRepository = require('../models/queries/StudentQuery');
const exceljs = require('exceljs')

const insertfromCsvFileToDatabase = async (req, res, next) => {
    try {
        const { id } = req.params;
        fs.createReadStream(req.files.file.tempFilePath)
            .pipe(csv())
            .on('data', (data) => {
                // Insert data into the database
                db.none('INSERT INTO attendance VALUES($1,$2)', [id, data.id])
                    .catch(error => {
                        return next(error)
                    });
            })
            .on('end', () => {
                console.log('Data insertion completed.');
            });
    }
    catch (err) {
        return next(err)

    }
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
// Convert data to CSV format
//     const csvData = data.map(row => Object.values(row).join(','));
//     csvData.unshift("Student_id")

//     // Define the file path and name
//     const filePath = join(__dirname, '..', "..", "./assets", `./ student_dropped${Date.now()}.csv`);

//     // Write CSV data to a file
//     fs.writeFileSync(filePath, csvData.join('\n'));

//     // Set the response headers to trigger a download
//     res.setHeader('Content-Type', 'text/csv');
//     res.setHeader('Content-Disposition', 'attachment; filename=data.csv');

//     // Stream the file to the response
//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
// } catch (error) {
//     console.error('Error exporting data:', error);
//     res.status(500).send('An error occurred while exporting data');
// }
// }

const csvFileController = { insertfromCsvFileToDatabase, exportStudentsWhoAttendLessthan25Percent }
module.exports = csvFileController