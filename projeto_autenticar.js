const { GoogleSpreasheet } = require('google-spreadsheet');
const credencias = require('./credentials.json');
const arquivo = require('./arquivo.json');
const { JWT } =  require('google-auth-library');

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets'
];

const jwt = new JWT({
    email: credencias.client_email,
    key: credencias.private_key,
    scopes: SCOPES,
});