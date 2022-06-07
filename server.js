const express = require("express");
const app = express();
const cors = require("cors");
const dataMatches = require('./data.json')
const getMatches = require('./getMatchesWH.js')
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json(dataMatches);
})

app.get("/forceupdate", (req, res) => {
    try {
        const data = await getMatches()
        fs.writeFile("data.json", JSON.stringify([...data]), err => {
            if (err) res.send(error).statusCode(500)
        });
        res.json(data)
      } catch (error) {
        console.log(error)
        res.send(error).statusCode(500);
      }
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