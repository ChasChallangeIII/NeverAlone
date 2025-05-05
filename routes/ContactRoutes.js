import express from "express";
import {
  addContact,
  removeContact,
  selectContacts,
  selectSearchContacts,
} from "../controllers/ContactController.js";

const router = express.Router();

router.post("/", addContact);
router.delete("/:userId/:contactId", removeContact);
router.get("/:userId", selectContacts);
router.get("/:userId/search", selectSearchContacts);

export default router;
