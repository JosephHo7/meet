// src/__tests__/EndToEnd.test.js
import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll( async () => {
        browser = await puppeteer.launch(
            // {headless:false, slowMo: 250,timeout: 0}
            );
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    })


    test('An event element is collapsed by default', async() => {
        // select event details
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        // simulate user clicking event detail button 
        await page.click('.event .detail-button');

        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event .detail-button');

        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    })
});