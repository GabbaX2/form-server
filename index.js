const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3080;


app.use(cors({
    origin: 'https://form-front-i7bt.vercel.app', 
    methods: ['GET', 'POST', 'OPTIONS'], 
    allowedHeaders: ['Content-Type'] 
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Gestisci le richieste OPTIONS per il preflight CORS
app.options('/utente', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/utente', (req, res) => {
    res.send('Ciao utente');
});

app.post('/utente', (req, res) => {
    console.log(req.body); // Log the incoming request body
    const { nome, cognome, eta, presentazione, selectedCountry, selectedJob, selectedRadio, remoteWork } = req.body;

    if (!nome || !cognome || !eta || !presentazione || !selectedCountry || !selectedJob || !selectedRadio || remoteWork === undefined) {
        return res.status(400).json({
            message: "Mancato inserimento dei dati nel form"
        });
    }

    res.json({
        message: `Nome: ${nome}, Cognome: ${cognome}, Presentazione: ${presentazione}, Paese: ${selectedCountry}, Lavoro: ${selectedJob}, Disponibile: ${remoteWork}, Esperienza: ${selectedRadio}`
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
