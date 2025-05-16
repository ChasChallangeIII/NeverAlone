import { insertGroupAndAdmin } from "../services/groupService";

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
