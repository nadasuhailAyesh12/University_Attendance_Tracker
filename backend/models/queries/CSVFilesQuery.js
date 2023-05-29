const exportHelper = require("../../helpers/exportFileHelper");
const db = require("../seeding/Connection");
const path = require('path')
const exportToExcel = (StringQuery, keys) => {
    const { workbook, worksheet } = exportHelper(keys)
    const filePath = path.join(__dirname, "..", "..", "..", "./assets", `./nada.xlsx`)
    return db.any(StringQuery)
        .then(data => {
            // Populate the worksheet with the data from the query result
            worksheet.addRows(data);

            // Save the workbook to an Excel file
            return workbook.xlsx.writeFile(filePath);
        })
        .then(() => {
            console.log('Data exported successfully!');
        })
        .catch(error => {
            console.error('Error exporting data:', error);
        });


}
module.exports = exportToExcel;