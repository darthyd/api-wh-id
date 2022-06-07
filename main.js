const fs = require("fs");
const app = require("./server.js");
const cron = require("./cron.js");

cron.start();

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000!');
})