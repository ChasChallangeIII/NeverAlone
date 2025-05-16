import express from "express";
import { createGroup, getGroups, joinGroup, leaveGroup } from "../controllers/GroupController.js";

const router = express.Router();

router.post("/", createGroup);

router.patch("/join/:groupid", joinGroup);

router.patch("/leave/:groupid", leaveGroup);

router.get("/", getGroups);

export default router;
