import { RecordNotFoundError } from "../utils/errors/recordErrors.js";
import { generateId } from "../utils/helpers.js";

const records = [];

export const getRecords = (_, res) => {
  res.status(200).json({ records, success: true });
};

export const getRecord = (req, res) => {
  const { recordid: recordId } = req.params;

  const record = records.find((rec) => rec.id == recordId);

  if (!record) {
    throw new RecordNotFoundError();
  }

  res.status(200).json({ record, success: true });
};

export const addRecord = (req, res) => {
  const { time, location } = req.body;

  const newRecord = { id: generateId(), time, location };

  records.push(newRecord);

  res.status(201).json({ message: "Record added successfully", success: true });
};
