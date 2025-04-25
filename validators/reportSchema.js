import { z } from "zod";

export const reportSchema = z
  .object({
    time: z
      .string()
      .datetime({ message: "Time must be a valid ISO 8601 datetime" }),
    location: z.object({
      lat: z.coerce
        .number()
        .min(-90, "Latitude must be between -90 and 90")
        .max(90),
      lng: z.coerce
        .number()
        .min(-180, "Longitude must be between -180 and 180")
        .max(180),
    }),
  })
  .strict();
