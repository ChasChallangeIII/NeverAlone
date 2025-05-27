import { getReportsFromDatabase } from '../server/db/db.js';

async function main() {
    try {
        const reports = await getReportsFromDatabase();
        console.log('Hämtade rapporter:', reports);
    } catch (error) {
        console.error('Fel:', error);
    }
}

main();