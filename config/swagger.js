import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const mainDoc = yaml.load(fs.readFileSync(path.resolve("docs/mainDocs.yaml"), "utf8"));
const pathDoc = yaml.load(fs.readFileSync(path.resolve("docs/recordDocs.yaml"), "utf8"));

export const swaggerDocs = {
  ...mainDoc,
  paths: {
    ...mainDoc.paths,
    ...pathDoc.paths,
  },
};
