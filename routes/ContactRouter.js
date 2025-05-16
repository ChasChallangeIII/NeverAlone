import express from "express";
import {
  addContact,
  removeContact,
  getContacts,
  searchContacts,
} from "../controllers/ContactController.js";

const router = express.Router();

router.post("/", addContact);
router.delete("/:contactId", removeContact);
router.get("/", getContacts);
router.get("/search", searchContacts);

export default router;
