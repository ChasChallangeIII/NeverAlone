import { NotFoundError } from "../utils/errors/appErrors.js";

const notFound = (req, _, next) => {
  next(new NotFoundError(`Could not find ${req.originalUrl}`));
};

export default notFound;
