// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';
// import * as cheerio from 'cheerio';

async function scrapeAndUpdateDatabase() {
    //     try {
    //         // Fetch the website
    //         const response = await fetch('https://example.com/firefighters'); // Replace with the actual URL
    //         const html = await response.text();
    //         const $ = cheerio.load(html);

    //         // Extract data (modify selectors based on website structure)
    //         const scrapedData = $('.firefighter-entry').map((_, el) => ({
    //             name: $(el).find('.name').text().trim(),
    //             forest: $(el).find('.forest').text().trim(),
    //             unit_type: $(el).find('.unit-type').text().trim(),
    //         })).get();

    //         // Update SQLite database
    //         const db = await open({
    //             filename: './firefighters.db',
    //             driver: sqlite3.Database,
    //         });

    //         // Clear existing data
    //         await db.run(`DELETE FROM firefighters`);

    //         // Insert new data
    //         const insertStmt = await db.prepare(
    //             `INSERT INTO firefighters (name, forest, unit_type) VALUES (?, ?, ?)`
    //         );

    //         for (const firefighter of scrapedData) {
    //             await insertStmt.run(firefighter.name, firefighter.forest, firefighter.unit_type);
    //         }

    //         await insertStmt.finalize();
    //         await db.close();
    //         console.log('Database updated successfully!');
    //     } catch (error) {
    //         console.error('Error scraping data:', error);
    //     }
}

export default scrapeAndUpdateDatabase;

// add to Vercel when ready for production
// "crons": [
//     {
//         "path": "/api/scrape.ts",
//         "schedule": "0 0 * * *"
//     }
// ]