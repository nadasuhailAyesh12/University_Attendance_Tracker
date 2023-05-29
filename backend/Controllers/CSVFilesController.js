const fs = require('fs')
const { join } = require('path')
const csv = require('csv-parser');
const db = require('../models/seeding/Connection');
const studentRepository = require('../models/queries/StudentQuery');

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

const exportStudentsWhoAttendLessthan25Percent = async (req, res, next) => {
    try {
        const { course_id, sec_id } = req.params;
        const data = await studentRepository.getStudentsWhoAttendLessthan25Percent(course_id, sec_id)

        // Convert data to CSV format
        const csvData = data.map(row => Object.values(row).join(','));
        csvData.unshift("Student_id")

        // Define the file path and name
        const filePath = join(__dirname, '..', "..", "./assets", `./ student_dropped${Date.now()}.csv`);

        // Write CSV data to a file
        fs.writeFileSync(filePath, csvData.join('\n'));

        // Set the response headers to trigger a download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=data.csv');

        // Stream the file to the response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error exporting data:', error);
        res.status(500).send('An error occurred while exporting data');
    }
}

const csvFileController = { insertfromCsvFileToDatabase, exportStudentsWhoAttendLessthan25Percent }
module.exports = csvFileController