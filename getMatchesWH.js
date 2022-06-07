const puppeteer = require('puppeteer');

async function getMatches() {
  const browser = await puppeteer.launch({
    headless: false,
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
    const delay = 1000;

    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await sleep(delay);
    }

    sleep(20000);

    const matches = document.querySelectorAll("article.sp-o-market--default");

    const arr = [];

    matches.forEach(e => {
      if(e.childNodes[1].childNodes[1].href === undefined
        || e.childNodes[1].textContent === undefined) return
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

module.exports = getMatches;