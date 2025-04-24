import { ReportNotFoundError } from "../utils/errors/reportErrors.js";
import { generateId } from "../utils/helpers.js";

const reports = [];

export const getReports = (_, res) => {
  res.status(200).json({ reports, success: true });
};

export const getReport = (req, res) => {
  const { reportid: reportId } = req.params;

  const report = reports.find((rep) => rep.id == reportId);

  if (!report) {
    throw new ReportNotFoundError();
  }

  res.status(200).json({ report, success: true });
};

export const addReport = (req, res) => {
  const { time, location } = req.body;

  const newReport = { id: generateId(), time, location };

  reports.push(newReport);

  res.status(201).json({ message: "Report added successfully", success: true });
};
