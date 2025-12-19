import express from "express";
import {
  addStaff,
  deleteStaff,
  editStaff,
  getStaff,
} from "../controller/staff.controller.js";
import { uploadstaff } from "../utils/multerHandler.js";
import islogin from "./../middleware/Islogin.js";
import { isAdmin } from "../middleware/IsAdmin.js";

export const staffRouter = express.Router();

staffRouter.post("/add-staff", islogin, uploadstaff.single("image"), addStaff); 
staffRouter.get("/get-staff", islogin, getStaff);
staffRouter.delete("/delete-staff/:id", islogin, isAdmin, deleteStaff); 
staffRouter.patch("/edit-staff/:id", islogin, editStaff);
