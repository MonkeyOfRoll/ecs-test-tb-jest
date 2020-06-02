const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  // launch browser
  browser = await puppeteer.launch({
    headless: false, // headless mode set to false so browser opens up with visual feedback
    slowMo: 50, // how slow actions should be, mimics user
  });
  // creates a new page in the opened browser
  page = await browser.newPage();
  await page.setViewport({
    width: 1366,
    height: 800,
    deviceScaleFactor: 1,
  });
});

// function for determining index of array balancing point
function BalancePointIndex(inputArray) {
  function BalancePoint(input) {
    let total = input.reduce((prev, cur) => prev + cur),
      leftSum = 0;

    return input.reduce((points, currentPoint, i) => {
      let rightSum;
      if (i > 0) {
        leftSum += input[i - 1];
      }

      rightSum = total - leftSum - currentPoint;

      if (leftSum === rightSum) {
        points.push(i);
      }
      return points;
    }, []);
  }
  const outputArray = BalancePoint(inputArray);


  if (Array.isArray(outputArray) && outputArray.length === 0) {
    return null;
  }
  return outputArray.toString();
}


describe('Page Loads', () => {
  test('h1 loads correctly', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.title');

    const html = await page.$eval('.title', e => e.innerHTML);
    expect(html).toBe('Welcome to the ECSDigital Engineer in Test tech test');
  }, 16000);
});


describe('Render Challenge', () => {
  test('Users can click challenge button and Challenge Renders', async () => {
    await page.click('[data-test-id="render-challenge"]');
    await page.waitForSelector('[data-test-id="challenge-section"]');
  }, 9000000);
});

describe('NEGATIVE: Submit Empty Form', () => {
  test('Submit Empty Form and check for correct dialog message', async () => {
    await page.waitFor('[data-test-id="submit-form"]');
    await page.click(('[data-test-id="submit-form"]'));
    await page.waitFor('[class="dialog"]');
    const appResponseDialog = await page.$eval('[class="dialog"] > div:first-child > div:first-child > div:first-child > div:first-child', e => e.innerHTML);
    expect(appResponseDialog).toBe('It looks like your answer wasn\'t quite right ❌');
    await page.click(('[data-test-id="close-dialog"]'));
  }, 16000);
});

describe('SUCCESS FLOW: Calc answers, populate and submit form ', () => {
  test('1st Row Calc and populate form', async () => {
    await page.waitForSelector('table');
    const firstRowText = await page.evaluate(() => Array.from(document.querySelectorAll('[data-test-id="table-row-1"] > [data-test-id*="array-item"]'), element => parseInt(element.textContent.trim(),10)));
    const correctAnswerRow1 = BalancePointIndex(firstRowText);
    await page.waitFor('input[data-test-id="submit-1"]');
    await page.type('input[data-test-id="submit-1"]', correctAnswerRow1);
  }, 9000000);


  test('2nd Row Calc and populate form', async () => {
    await page.waitForSelector('table');
    const secondRowText = await page.evaluate(() => Array.from(document.querySelectorAll('[data-test-id="table-row-2"] > [data-test-id*="array-item"]'), element => parseInt(element.textContent.trim(),10)));
    console.log('!!! 2nd Row Answer', BalancePointIndex(secondRowText));
    const correctAnswerRow2 = BalancePointIndex(secondRowText);
    await page.waitFor('input[data-test-id="submit-2"]');
    await page.type('input[data-test-id="submit-2"]', correctAnswerRow2);
  }, 9000000);

  test('3rd Row Calc and populate form', async () => {
    await page.waitForSelector('table');
    const thirdRowText = await page.evaluate(() => Array.from(document.querySelectorAll('[data-test-id="table-row-3"] > [data-test-id*="array-item"]'), element => parseInt(element.textContent.trim(),10)));
    const correctAnswerRow3 = BalancePointIndex(thirdRowText);
    await page.waitFor('input[data-test-id="submit-3"]');
    await page.type('input[data-test-id="submit-3"]', correctAnswerRow3);
    await page.$eval('input[data-test-id="submit-4"]', el => el.value = 'Thomas E Bowden Esq');
  }, 9000000);

  test('Submit form and check for Success dialog message ', async () => {
    await page.waitFor('[data-test-id="submit-form"]');
    await page.click(('[data-test-id="submit-form"]'));
    await page.waitFor('[class="dialog"]');
    const appResponseDialog = await page.$eval('[class="dialog"] > div:first-child > div:first-child > div:first-child > div:first-child', e => e.innerHTML); // there should be a better way of construction this selector...
    expect(appResponseDialog).toBe('Congratulations you have succeeded. Please submit your challenge ✅');
    await page.click(('[data-test-id="close-dialog"]'));
  }, 9000000);

});


afterAll(async () => {
  // close browser
  await browser.close();
});

