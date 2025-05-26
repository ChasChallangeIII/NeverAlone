import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  addContact,
  removeContact,
  getContacts,
  searchContacts,
} from "../controllers/ContactController.js";

const router = express.Router();

router.post("/", authenticate, addContact);
router.delete("/:contactId", authenticate, removeContact);
router.get("/", authenticate, getContacts);
router.get("/search", authenticate, searchContacts);

export default router;
