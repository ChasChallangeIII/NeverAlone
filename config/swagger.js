import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const mainDoc = yaml.load(fs.readFileSync(path.resolve("docs/mainDocs.yaml"), "utf8"));
const authDoc = yaml.load(fs.readFileSync(path.resolve("docs/authDocs.yaml"), "utf8"));
const reportDoc = yaml.load(fs.readFileSync(path.resolve("docs/reportDocs.yaml"), "utf8"));
const contactDoc = yaml.load(fs.readFileSync(path.resolve("docs/contactDocs.yaml"), "utf8"));
const communityDoc = yaml.load(fs.readFileSync(path.resolve("docs/communityDocs.yaml"), "utf8"));
const groupDoc = yaml.load(fs.readFileSync(path.resolve("docs/groupDocs.yaml"), "utf8"));
const commentDoc = yaml.load(fs.readFileSync(path.resolve("docs/commentDocs.yaml"), "utf8"));

export const swaggerDocs = {
  ...mainDoc,
  paths: {
    ...mainDoc.paths,
    ...authDoc.paths,
    ...reportDoc.paths,
    ...contactDoc.paths,
    ...communityDoc.paths,
    ...groupDoc.paths,
    ...commentDoc.paths,
  },
  components: {
    schemas: {
      ...(authDoc.components?.schemas || {}),
      ...(reportDoc.components?.schemas || {}),
      ...(contactDoc.components?.schemas || {}),
      ...(communityDoc.components?.schemas || {}),
      ...(groupDoc.components?.schemas || {}),
      ...(commentDoc.components?.schemas || {}),
    },
  },
};
