const puppeteer = require('puppeteer');

module.exports = async function getMatches() {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  await page.goto(`https://sports.williamhill.com/betting/en-gb/football/matches/competition/today/match-betting`, {
    waitUntil: 'networkidle2'
  });
    
  const dataMatches = await page.evaluate(async () => {
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    sleep(10000);
    
    const distance = 100;
    const delay = 500;

    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await sleep(delay);
    }

    const matches = document.querySelectorAll("article.sp-o-market--default");

    const arr = [];

    matches.forEach(e => {
        arr.push({
            id: e.childNodes[1].childNodes[1].href.split("OB_EV")[1].split("/")[0],
            home: e.childNodes[1].textContent.split(" v ")[0].trim(),
            away: e.childNodes[1].textContent.split(" v ")[1].trim(),
        });
    })

    return arr;
  })

  await browser.close();

  return dataMatches;
};