const puppeteer = require("puppeteer");

async function createPDF(url, args = {}) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        deviceScaleFactor: 1,
        hasTouch: false,
        height: 1080,
        isLandscape: true,
        isMobile: false,
        width: 1920,
      },
      ...args,
    });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 10000, waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "a4",
      displayHeaderFooter: false,
      printBackground: true,
    });
    await browser.close();
    return pdf;
  } catch (err) {
    console.log(err);
  }
}

module.exports = createPDF;
