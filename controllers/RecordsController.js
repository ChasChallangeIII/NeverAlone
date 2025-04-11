import { RecordNotFoundError } from "../utils/errors/recordErrors";
import { generateId } from "../utils/helpers";

const records = [];

export const getRecords = (_, res) => {
  res
    .status(200)
    .json({ records, message: "Record added successfully", success: true });
};

export const getRecord = (req, res) => {
  const { recordid: recordId } = req.params;

  const record = records.find((rec) => rec.id == recordId);

  if (!record) {
    throw new RecordNotFoundError();
  }

  res
    .status(200)
    .json({ record, message: "Record added successfully", success: true });
};

export const addRecord = (req, res) => {
  const { time, location } = req.body;

  const newRecord = { id: generateId(), time, location };

  records.push(newRecord);

  res.status(200).json({ message: "Record added successfully", success: true });
};
