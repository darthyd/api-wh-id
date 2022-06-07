const express = require("express");
const app = express();
const cors = require("cors");
const dataMatches = require('./data.json')
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json(dataMatches);
})

app.get('/id', (req, res) => {
    const { home, away } = req.query;
    if(dataMatches.length === 0 || !home || !away) res.send("Sem dados. Verifique a requisição ou tente Novamente mais tarde.")
    const filtered = dataMatches.find(match => {
        return match.home.toLowerCase().includes(home.toLowerCase()) && match.away.toLowerCase().includes(away.toLowerCase());
    });
    if(!filtered) res.send("Não encontrado")
    res.send(filtered?.id);
});

module.exports = app;