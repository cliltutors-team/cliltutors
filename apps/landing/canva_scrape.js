const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    console.log("Launching browser...");
    const browser = await chromium.launch();
    const page = await browser.newPage();

    console.log("Navigating to Canva view page...");
    await page.goto('https://www.canva.com/design/DAHATQZ0Jz0/JBHCBlII6VpplYLJTyNxAQ/view', { waitUntil: 'networkidle' });

    await page.waitForTimeout(5000);

    console.log("Scrolling the page to load assets...");
    for (let i = 0; i < 20; i++) {
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(500);
    }

    console.log("Extracting content...");
    const text = await page.evaluate(() => {
        return document.body.innerText;
    });

    const outerHTML = await page.evaluate(() => {
        return document.documentElement.outerHTML;
    });

    fs.writeFileSync('./canva_text.txt', text);
    fs.writeFileSync('./canva_dom.html', outerHTML);

    console.log('Done mapping to canva_text.txt and html!');
    await browser.close();
})();
