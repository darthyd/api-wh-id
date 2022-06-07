const CronJob = require('cron').CronJob;
const getMatches = require('./getMatchesWH.js');

// // set a CronJob to run in the first minute of every day
// new CronJob('00 00 00 * * *', function() {
//     // run the getMatches function
//     getMatches().then(data => {
//         console.log(data)
//         fs.writeFile("data.json", JSON.stringify([...data]), err => {
//             if (err) throw err;
//         });
//     })
// }, null, true, 'America/Sao_Paulo');

const job = new CronJob(
    //  ss mm HH D M Y
       '00 00 00 * * *',
       function() {
           getMatches().then(data => {
               console.log(data)
               fs.writeFile("data.json", JSON.stringify([...data]), err => {
                   if (err) throw err;
               });
           })
       },
       null,
       false,
       'Europe/London',
   );
   
module.exports = job;