import express from "express";
import {
  addServices,
  deleteService,
  getAllServices,
  getServices,
  updateService,
} from "../controller/service.controller.js";
import { uploadService } from "../utils/multerHandler.js";
import islogin from "../middleware/auth/Islogin.js";
import { authorizeRoles } from "../middleware/auth/AuthorizeRoles.js";
import { authorizeBranchAccess } from "../middleware/auth/BranchAccess.js";

export const serviceRouter = express.Router();

serviceRouter.post(
  "/add-service",
  islogin,
  authorizeRoles("admin", "manager"),
  uploadService.single("image"),
  authorizeBranchAccess,
  addServices
);

serviceRouter.get("/get-service",islogin,authorizeRoles("admin","manager"),authorizeBranchAccess, getServices);
serviceRouter.get("/get-services",islogin, getAllServices);

serviceRouter.delete(
  "/delete-service/:branch_id/:id",
  islogin,
  authorizeRoles("admin", "manager"),
  authorizeBranchAccess,
  deleteService
);

serviceRouter.patch(
  "/update-service/:branch_id/:id",
  islogin,
  authorizeRoles("admin", "manager"),
  authorizeBranchAccess,
  uploadService.single("image"),
  updateService
);
