import {
  deleteGroupMember,
  insertGroupAndAdmin,
  insertNewGroupMember,
  selectGroups,
} from "../services/groupService.js";

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
    res.status(200).json({ groupName, message: "Successfully joined group", success: true });
  } catch (err) {
    next(err);
  }
};

export const leaveGroup = async (req, res, next) => {
  const { groupid: groupId } = req.params;
  const { id: userId } = req.user;

  try {
    const groupName = await deleteGroupMember(userId, groupId);

    res.status(200).json({ groupName, message: "Successfully left group", success: true });
  } catch (err) {
    next(err);
  }
};

export const getGroups = async (req, res, next) => {
  const { q: query } = req.query;

  try {
    const groups = await selectGroups(query);
    res.status(200).json({ groups, success: true });
  } catch (err) {
    next(err);
  }
};
