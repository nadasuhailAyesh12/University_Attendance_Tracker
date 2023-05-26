const fs = require('fs')
const path = require('path')
const csv = require('csv-parser');
const db = require('../models/seeding/Connection');


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

const csvFileController = { insertfromCsvFileToDatabase }
module.exports = csvFileController