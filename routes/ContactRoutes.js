import express from "express";
import {
  addContact,
  removeContact,
  getContacts,
  searchContacts,
} from "../controllers/ContactController.js";

const router = express.Router();

router.post("/", addContact);
router.delete("/:userId/:contactId", removeContact);
router.get("/:userId", getContacts);
router.get("/:userId/search", searchContacts);

export default router;
