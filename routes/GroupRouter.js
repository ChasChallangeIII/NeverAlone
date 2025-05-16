import express from "express";
import { createGroup } from "../controllers/GroupController";

const router = express.Router();

// create group
router.post("/", createGroup);

//join group
// router.patch("/")

//leave group
// router.patch("/leave")

//get groups
// router.get("/")

//search groups
// router.get("/?q")

export default router;
