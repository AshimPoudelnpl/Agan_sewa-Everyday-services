import express from "express";
import {
  addGallery,
  addInquiry,
  addReview,
  addTrustedCustomers,
  deleteGallery,
  deleteReview,
  getGallery,
  getInquiry,
  getReview,
  getTrustedCustomers,
} from "../controller/site.controller.js";
import { uploadCustomer, uploadGallery } from "../utils/multerHandler.js";
import islogin from "../middleware/Islogin.js";
import { isAdmin } from "../middleware/IsAdmin.js";

export const siteRouter = express.Router();

siteRouter.post("/add-inquiry", addInquiry); 
siteRouter.get("/get-inquiry", islogin, isAdmin, getInquiry); 


siteRouter.post("/add-review", addReview); 
siteRouter.get("/get-review", getReview); 
siteRouter.delete("/delete-review/:id", islogin, isAdmin, deleteReview);

siteRouter.post(
  "/add-trustedcustomers",
  islogin,
  isAdmin,
  uploadCustomer.single("image"),
  addTrustedCustomers
); 
siteRouter.get("/get-trustedCustomers", getTrustedCustomers); 

siteRouter.post("/add-gallery", islogin, isAdmin, uploadGallery.array("image", 30), addGallery); 
siteRouter.get("/get-gallery", getGallery); 
siteRouter.delete("/delete-gallery/:id", islogin, isAdmin, deleteGallery);
