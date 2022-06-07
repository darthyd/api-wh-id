const app = require("./server.js");
const cron = require("./cron.js");
const fs = require("fs");
const dataMatches = require("./data.json");
const getMatches = require("./getMatchesWH.js");

if(dataMatches.length < 0) getMatches().then(data => {
    console.log(data)
    fs.writeFile("data.json", JSON.stringify([...data]), err => {
        if (err) throw err;
    });
})

cron.start();

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000!');
})