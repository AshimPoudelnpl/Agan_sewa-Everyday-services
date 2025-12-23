import express from "express";
import {
  addStaff,
  deleteStaff,
  editStaff,
  getStaff,
} from "../controller/staff.controller.js";
import { uploadstaff } from "../utils/multerHandler.js";
import islogin from "./../middleware/Islogin.js";
import { authorizeRoles } from "../middleware/Role.js";
export const staffRouter = express.Router();
staffRouter.post("/add-staff", islogin, authorizeRoles("admin"), uploadstaff.single("image"), addStaff);
staffRouter.get("/get-staff", islogin, authorizeRoles("admin"), getStaff);
staffRouter.delete("/delete-staff/:id", islogin, authorizeRoles("admin"), deleteStaff);
staffRouter.patch("/edit-staff/:id", islogin, authorizeRoles("admin"), editStaff);
