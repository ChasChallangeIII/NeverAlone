import {
  findReport,
  findReports,
  insertReport,
} from "../services/reportService.js";

export const getReports = async (_, res, next) => {
  try {
    const reports = await findReports();
    res.status(200).json({ reports, success: true });
  } catch (err) {
    next(err);
  }
};

export const getReport = async (req, res, next) => {
  try {
    const { reportid: reportId } = req.params;

    const report = await findReport(reportId);

    res.status(200).json({ report, success: true });
  } catch (err) {
    next(err);
  }
};

export const addReport = async (req, res, next) => {
  const { id: userId } = req.user;

  try {
    const reportId = await insertReport(req.body, userId);

    res.status(201).json({
      message: `New report ${reportId} added successfully`,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
