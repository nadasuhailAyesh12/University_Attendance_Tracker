const ExcelJS = require('exceljs')

const db = require("../models/seeding/Connection");

const exportHelper = (keys) => {
    const workbook = new ExcelJS.Workbook();
    // Create a new worksheet within the workbook
    const worksheet = workbook.addWorksheet('Sheet 1');
    const generateCloumnsHeaders = () => {
        const cloumns = []
        for (let i = 0; i < keys.length; i++) {
            cloumns[i] = { header: keys[i], key: keys[i], width: 15 };
        }
        return cloumns;
    }
    // Add the columns to the worksheet
    worksheet.columns = generateCloumnsHeaders();
    return { workbook, worksheet };
}

module.exports = exportHelper
