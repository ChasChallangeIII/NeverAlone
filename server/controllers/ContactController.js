import {
  insertContact,
  deleteContact,
  selectContacts,
  selectSearchContacts,
} from "../services/contactService.js";

export async function addContact(req, res) {
  const { id: userId } = req.user;
  const { contactId } = req.body;

  try {
    if (userId === contactId) {
      return res
        .status(400)
        .json({ error: "You cannot add yourself as a contact" });
    }

    const contact = await insertContact(userId, contactId);

    if (!contact) {
      return res.status(409).json({ message: "Contact already exists" });
    }

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function removeContact(req, res) {
  const { id: userId } = req.user;
  const { contactId } = req.params;

  try {
    await deleteContact(userId, contactId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getContacts(req, res) {
  const { id: userId } = req.user;

  try {
    const contacts = await selectContacts(userId);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function searchContacts(req, res) {
  const { id: userId } = req.user;
  const { q } = req.query;

  try {
    const results = await selectSearchContacts(userId, q || "");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
