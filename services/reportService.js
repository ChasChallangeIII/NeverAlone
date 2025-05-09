import { ReportNotFoundError } from "../utils/errors/reportErrors.js";
import { executeQuery } from "./db/db.js";
import { getLocation } from "./locationService.js";

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

  return await executeQuery(query);
};

export const insertReport = async (data, userId) => {
  const { location, cause, message } = data;

  if (!location?.latitude || !location?.longitude) {
    throw new Error("Location must include latitude and longitude");
  }

  const city = await getLocation(location.latitude, location.longitude);

  const query = `
    INSERT INTO reports (user_id, location, city, status, cause, message)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
  `;

  const result = await executeQuery(query, [
    userId,
    JSON.stringify(location),
    city,
    cause,
    message,
    "pending",
  ]);

  if (result.length === 0) {
    throw new ReportNotFoundError();
  }

  return result[0].id;
};
