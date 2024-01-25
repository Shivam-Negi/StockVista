const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Stock = require('../models/stock');

const csvFolderPath = path.join(__dirname, '../../', 'Extracted-Data');

async function processCSVAndStore() {
  try {
    // Read all CSV files in the folder
    const csvFiles = fs.readdirSync(csvFolderPath).filter(file => file.endsWith('.CSV'));

    // Process each CSV file
    for (const csvFile of csvFiles) {
      const filePath = path.join(csvFolderPath, csvFile);

      // Extract date from the file name (assuming it's always in the format EQDDMMYY.CSV)
      const dateMatch = csvFile.match(/EQ(\d{2})(\d{2})(\d{2})\.CSV/);
      if (!dateMatch) {
        console.error(`Invalid file name format for ${csvFile}`);
        continue;
      }

      const [_, day, month, year] = dateMatch;
      const currentDate = `${day}-${month}-${year}`;
      console.log('date : ', currentDate);

      // Read data from the CSV file
      const readStream = fs.createReadStream(filePath);
      await new Promise((resolve, reject) => {
        readStream.pipe(csv())
          .on('data', async (row) => {
            // Map CSV data to your mongoose model fields and trim whitespace
            const existingStock = await Stock.findOne({ code: row.SC_CODE.trim() });

            if (existingStock) {
              // Check if data for the current date already exists in history
              const existingDataForDate = existingStock.history.some(data => data.date === currentDate);

              if (!existingDataForDate) {
                // Push new historical data for the current date
                existingStock.history.push({
                  date: currentDate,
                  open: row.OPEN.trim(),
                  high: row.HIGH.trim(),
                  low: row.LOW.trim(),
                  close: row.CLOSE.trim(),
                });

                await existingStock.save();
              }
            } else {
              // Create a new stock if it doesn't exist
              const newStock = new Stock({
                code: row.SC_CODE.trim(),
                name: row.SC_NAME.trim(),
                turnover: row.NET_TURNOV.trim(),
                history: [
                  {
                    date: currentDate,
                    open: row.OPEN.trim(),
                    high: row.HIGH.trim(),
                    low: row.LOW.trim(),
                    close: row.CLOSE.trim(),
                  },
                ],
              });

              await newStock.save();
            }
          })
          .on('end', resolve)
          .on('error', reject);
      });
    }

    console.log('Data updated in MongoDB successfully.');
  } catch (error) {
    console.error(`Error processing CSV and storing data: ${error.message}`);
  }
}

module.exports = {
  processCSVAndStore,
};
