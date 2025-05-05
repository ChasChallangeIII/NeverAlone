import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const mainDoc = yaml.load(
  fs.readFileSync(path.resolve("docs/mainDocs.yaml"), "utf8")
);
const pathDoc = yaml.load(
  fs.readFileSync(path.resolve("docs/reportDocs.yaml"), "utf8")
);
const contactDoc = yaml.load(
  fs.readFileSync(path.resolve("docs/contactDocs.yaml"), "utf8")
);

export const swaggerDocs = {
  ...mainDoc,
  paths: {
    ...mainDoc.paths,
    ...pathDoc.paths,
    ...contactDoc.paths,
  },
};
