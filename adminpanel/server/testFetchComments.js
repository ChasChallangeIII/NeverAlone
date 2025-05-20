import { executeQuery } from '../server/db/db.js';

async function testFetchComments() {
    try {
        const comments = await executeQuery("SELECT * FROM report_comments");
        console.log('Hämtade kommentarer:', comments.rows); 
    } catch (error) {
        console.error('Fel vid hämtning av kommentarer:', error);
    }
}

testFetchComments();
