import { z } from "zod";

export const reportSchema = z
  .object({
    location: z.object({
      lat: z.coerce
        .number()
        .min(-90, { message: "Latitude must be greater or equal to -90" })
        .max(90, { message: "Latitude must be less or equal to 90" }),
      lng: z.coerce
        .number()
        .min(-180, { message: "Longitude must be greater or equal to -180" })
        .max(180, { message: "Longitude must less or equal to 180" }),
    }),
    cause: z
      .string({ message: "Cause must be a string" })
      .nonempty({ message: "Cause is required" })
      .min(10, { message: "Cause must be at least 10 characters long" })
      .max(200, { message: "Cause cannot be longer that 200 characters'" }),
    text: z
      .string({ message: "Text must be a string" })
      .nonempty({ message: "Text is required" })
      .min(10, { message: "Text must be at least 10 characters long" }),
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
