import express from "express";
import {
  addmanagerByAdmin,
  deletemangerByAdmin,
  editmanaagerByAdmin,
  getmanagerByAdmin,
  loginUser,
  logoutUser,
  verifyToken,
} from "../controller/auth.controller.js";
import islogin from "../middleware/auth/Islogin.js";
import { uploadmanager, uploadstaff } from "../utils/multerHandler.js";
import { authorizeRoles } from "../middleware/auth/AuthorizeRoles.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout", islogin, logoutUser);
authRouter.get("/verifyToken",islogin,verifyToken)
authRouter.post(
  "/add-manager",
  islogin,
  authorizeRoles("admin"),
  uploadmanager.single("image"),
  addmanagerByAdmin
);
authRouter.get(
  "/get-manager",
  islogin,
  authorizeRoles("admin"),
  getmanagerByAdmin
);
authRouter.delete(
  "/delete-manager/:id",
  islogin,
  authorizeRoles("admin"),
  deletemangerByAdmin
);
authRouter.patch(
  "/edit-manager/:id",
  islogin,
  authorizeRoles("admin"),
  editmanaagerByAdmin
);
export default authRouter;
