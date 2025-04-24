import { z } from "zod";

export const reportSchema = z.object({
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
});
