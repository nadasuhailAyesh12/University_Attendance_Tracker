const ExcelJS = require('exceljs')

const exportHelper = (data, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    // Add column headers to the worksheet
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    // Add data rows to the worksheet
    data.forEach(row => {
        const values = Object.values(row);
        worksheet.addRow(values);
    });
    return workbook.xlsx.write(res);
}

module.exports = exportHelper
