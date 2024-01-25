const axios = require('axios');
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const { ZIP } = require('../config/server-config');

const downloadUrl = ZIP;
const downloadFilePath = path.join(__dirname, '../../', 'downloadedFile.zip');
console.log(downloadFilePath);
const extractFolderPath = path.join(__dirname, '../../', 'Extracted-Data');

async function downloadAndExtractData() {
  try {
    console.log('Downloading file...');
    const response = await axios({
      method: 'get',
      url: downloadUrl,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(downloadFilePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    console.log('File downloaded successfully.');

    console.log('Extracting ZIP file...');
    const zip = new AdmZip(downloadFilePath);
    zip.extractAllTo(extractFolderPath, /*overwrite*/ false);
    console.log('ZIP file extracted successfully.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

module.exports = {
  downloadAndExtractData,
};
