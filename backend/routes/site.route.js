import express from "express";
import {
  addGallery,
  addInquiry,
  addReview,
  addTrustedCustomers,
  deleteGallery,
  deleteReview,
  getAllGallery,
  getGallery,
  getInquiry,
  getReview,
  getTrustedCustomers,
} from "../controller/site.controller.js";
import { uploadCustomer, uploadGallery } from "../utils/multerHandler.js";
import islogin from "./../middleware/auth/Islogin.js";
import { authorizeRoles } from "../middleware/auth/AuthorizeRoles.js";
import { authorizeBranchAccess } from "../middleware/auth/BranchAccess.js";

export const siteRouter = express.Router();
siteRouter.post("/add-inquiry", addInquiry);
siteRouter.get("/get-inquiry", islogin, authorizeRoles("admin", "manager"), authorizeBranchAccess, getInquiry);
siteRouter.post("/add-review", addReview);
siteRouter.get("/get-review", getReview);
siteRouter.delete("/delete-review/:id", islogin, authorizeRoles("admin"), deleteReview);
siteRouter.post(
  "/add-trustedcustomers",
  islogin,
  authorizeRoles("admin"),
  uploadCustomer.single("image"),
  addTrustedCustomers
);
siteRouter.get("/get-trustedCustomers", getTrustedCustomers);
siteRouter.post(
  "/add-gallery",
  islogin,
  authorizeRoles("admin", "manager"),
  authorizeBranchAccess,
  uploadGallery.array("image", 30),
  addGallery
);
siteRouter.get("/get-gallery", getGallery);
siteRouter.get("/get-galleries", getAllGallery);
siteRouter.delete("/delete-gallery/:id", islogin, authorizeRoles("admin", "manager"), authorizeBranchAccess, deleteGallery);
