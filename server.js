const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const dataMatches = require('./public/data.json')
const getMatches = require('./getMatchesWH.js')


app.use(cors())
app.use(express.json())

app.get("/forceupdate", async (req, res) => {
    try {
        const data = await getMatches()
        fs.writeFile("public/data.json", JSON.stringify([...data]), err => {
            if (err) {
                console.log("err1:", err);
                throw err;
            }
        });
        console.log("data:", data)
        res.json(data)
      } catch (error) {
        console.log("err2:", error)
        res.send(error);
      }
})

app.get('/id', async (req, res) => {
    const { home, away } = req.query;
    if(dataMatches.length === 0 || !home || !away) res.send("Sem dados. Verifique a requisição ou tente Novamente mais tarde.")
    const filtered = dataMatches.find(match => {
        return match.home.toLowerCase().includes(home.toLowerCase()) && match.away.toLowerCase().includes(away.toLowerCase());
    });
    if(!filtered) res.send("Não encontrado")
    res.send(filtered?.id);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    res.json(dataMatches);
})

module.exports = app;