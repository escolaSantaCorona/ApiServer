const { getAuthenticatedSheetsApi } = require('./sheets-api');

const spreadsheetId = '1DHXS-3EgZQcNivBxeo-0YnXfAaRGu3rdLs2gWjwgDR4'; // Substitua pelo ID da sua planilha.

async function read(sheetName, range) {
  try {
    const sheetsApi = await getAuthenticatedSheetsApi();
    const response = await sheetsApi.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!${range}`,
    });

    return response.data.values;
  } catch (error) {
    console.error('Error reading from sheet:', error);
    throw error;
  }
}

async function createOrUpdate(sheetName, range, values, valueInputOption = 'RAW') {
  try {
    const sheetsApi = await getAuthenticatedSheetsApi();
    await sheetsApi.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!${range}`,
      valueInputOption,
      resource: { values },
    });
  } catch (error) {
    console.error('Error updating sheet:', error);
    throw error;
  }
}

async function append(sheetName, range, values, valueInputOption = 'RAW') {
  try {
    const sheetsApi = await getAuthenticatedSheetsApi();
    await sheetsApi.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!${range}`,
      valueInputOption,
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}

async function clear(sheetName, range) {
  try {
    const sheetsApi = await getAuthenticatedSheetsApi();
    await sheetsApi.spreadsheets.values.clear({
      spreadsheetId,
      range: `${sheetName}!${range}`,
      resource: {},
    });
  } catch (error) {
    console.error('Error clearing sheet:', error);
    throw error;
  }
}

module.exports = { read, createOrUpdate, append, clear };
