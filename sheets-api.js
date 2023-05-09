const fs = require('fs');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SERVICE_ACCOUNT_KEY_PATH = 'service-account-key.json'; // Substitua pelo caminho do arquivo JSON da chave da conta de serviço.

async function authorize() {
  const serviceAccountKey = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_KEY_PATH));
  const jwtClient = new google.auth.JWT(
    serviceAccountKey.client_email,
    null,
    serviceAccountKey.private_key,
    SCOPES,
    null
  );

  return new Promise((resolve, reject) => {
    jwtClient.authorize((err, tokens) => {
      if (err) {
        console.error('Error authorizing service account:', err);
        reject(err);
      } else {
        resolve(jwtClient);
      }
    });
  });
}

async function getAuthenticatedSheetsApi() {
  const auth = await authorize();
  return google.sheets({ version: 'v4', auth });
}

module.exports = { getAuthenticatedSheetsApi };
