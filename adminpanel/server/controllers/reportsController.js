import { getReportsFromDatabase } from '../../server/db/db.js';

export const getReports = async (req, res) => {
    try {
        const reports = await getReportsFromDatabase(); 
        res.json({ reports });
    } catch (error) {
        res.status(500).json({ message: 'Något gick fel', error: error.message });
    }
};