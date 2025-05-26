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
    INSERT INTO reports (location, city, status, cause, message, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
  `;

  const result = await executeQuery(query, [
    JSON.stringify(location),
    city,
    "pending",
    cause,
    message,
    userId,
  ]);

  if (result.length === 0) {
    throw new ReportNotFoundError();
  }

  return result[0].id;
};
