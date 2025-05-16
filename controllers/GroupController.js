import { insertGroupAndAdmin, insertNewGroupMember } from "../services/groupService.js";

export const createGroup = async (req, res, next) => {
  const { groupName } = req.body;
  const { id: userId } = req.user;

  try {
    const groupId = await insertGroupAndAdmin(userId, groupName);
    res.status(201).json({ message: "Group created successfully", groupId });
  } catch (err) {
    next(err);
  }
};

export const joinGroup = async (req, res, next) => {
  const { groupid: groupId } = req.params;
  const { id: userId } = req.user;

  try {
    const groupName = await insertNewGroupMember(userId, groupId);
    res.status(200).json({ message: "Successfully joined group", groupName });
  } catch (err) {
    next(err);
  }
};
