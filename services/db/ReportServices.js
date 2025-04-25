import { ReportNotFoundError } from "../../utils/errors/reportErrors.js";
import { executeQuery } from "./dbInit.js";

export const findReport = async (reportId) => {
  const query = `
        SELECT * FROM reports
        WHERE id = $1;
    `;

  const result = await executeQuery(query, [parseInt(reportId)]);

  if (result.length === 0) {
    throw new ReportNotFoundError();
  }

  return result[0];
};

export const findReports = async () => {
  const query = `
    SELECT * FROM reports;
  `;

  return (result = await executeQuery(query));
};

export const insertReport = async (data) => {
  const { location, cause, text } = data;

  const query = `
    INSERT INTO reports (location, cause, text)
    VALUES ($1, $2, $3)
    RETURNING id;
  `;

  const result = await executeQuery(query, [
    JSON.stringify(location),
    cause,
    text,
  ]);

  if (result.length === 0) {
    throw new ReportNotFoundError();
  }

  return result[0].id;
};
