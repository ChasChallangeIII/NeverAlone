import { z } from "zod";

export const reportSchema = z
  .object({
    location: z.object({
      latitude: z.coerce
        .number()
        .min(-90, { message: "Latitude must be ≥ -90" })
        .max(90, { message: "Latitude must be ≤ 90" }),
      longitude: z.coerce
        .number()
        .min(-180, { message: "Longitude must be ≥ -180" })
        .max(180, { message: "Longitude must be ≤ 180" }),
    }),
    cause: z
      .string({ message: "Cause must be a string" })
      .nonempty({ message: "Cause is required" })
      .min(10, { message: "Cause must be at least 10 characters" })
      .max(200, { message: "Cause cannot exceed 200 characters" }),
    message: z
      .string({ message: "Text must be a string" })
      .nonempty({ message: "Text is required" })
      .min(10, { message: "Message must be at least 10 characters" }),
  })
  .strict();

export const validateReportReqBody = (req, res, next) => {
  try {
    reportSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
