const { GoogleSpreadsheet } = require('google-spreadsheet');
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

async function GetDoc() {
    const doc = new GoogleSpreadsheet(arquivo.id, jwt);
    await doc.loadInfo();
    return doc;
   };

async function ReadWorkSheet(){
    let sheet = (await GetDoc()).sheetsByIndex[0];
    let rows = await sheet.getRows()
    let users = rows.map(row => {
        return row.toObject()
    })
    return users
}

async function AddUser(data = {}) {
   const response = await fetch("https://apigenerator.dronahq.com/api/V8MQNTHe/data", {
   method: "POST",
   headers: {
        "Content-Type": "application/json",
   },
   body: JSON.stringify(data),
    });
    return response.json();
}

async function TrackData(){
    let data = await ReadWorkSheet();
    data.map(async (user) => {
        let response = await AddUser(user)
        console.log(response)
    })
    return console.log('dados copiados com sucesso')
}