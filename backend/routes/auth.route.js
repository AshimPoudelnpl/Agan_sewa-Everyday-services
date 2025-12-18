import express from "express";
import {
  addmanagerByAdmin,
  addStaffByManager,
  deletemangerByAdmin,
  editmanaagerByAdmin,
  getmanagerByAdmin,
  loginUser,
  logoutUser,
} from "../controller/auth.controller.js";
import islogin from "../middleware/Islogin.js";
import { addStaff } from "../controller/staff.controller.js";
import { uploadmanager, uploadstaff } from "../utils/multerHandler.js";
import { isAdmin } from "../middleware/IsAdmin.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout", islogin, logoutUser);
authRouter.post("/add-staff", uploadstaff.single("image"),islogin, addStaffByManager);
authRouter.post(
  "/add-manager",islogin,isAdmin,
  uploadmanager.single("image"),
  addmanagerByAdmin
);
authRouter.get("/get-manager",islogin,isAdmin,getmanagerByAdmin);
authRouter.delete("/delete-manager/:id",islogin,isAdmin,deletemangerByAdmin)
authRouter.patch("/edit-manager/:id",islogin,isAdmin,editmanaagerByAdmin)
export default authRouter;
