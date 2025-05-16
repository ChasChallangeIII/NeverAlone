import express from "express";
import { createGroup, joinGroup } from "../controllers/GroupController.js";

const router = express.Router();

// create group
router.post("/", createGroup);

//join group
router.patch("/:groupid", joinGroup);

//leave group
// router.patch("/leave")

//get groups
// router.get("/")

//search groups
// router.get("/?q")

export default router;
