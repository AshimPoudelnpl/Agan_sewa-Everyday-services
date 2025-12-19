import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  deleteBranch,
  deleteDistrict,
  deleteProvince,
  getBranch,
  getDistrictByProvince,
  getProvince,
  updateBranch,
} from "../controller/branch.controller.js";
import islogin from "../middleware/Islogin.js";
import { isAdmin } from "../middleware/IsAdmin.js";

export const branchRouter = express.Router();

branchRouter.post("/add-province", islogin, isAdmin, addProvince);
branchRouter.get("/get-province", getProvince); 
branchRouter.delete("/delete-province/:id", islogin, isAdmin, deleteProvince); 


branchRouter.post("/add-district/", islogin, isAdmin, addDistrict); 
branchRouter.get("/get-district", getDistrictByProvince); 
branchRouter.delete("/delete-district/:id", islogin, isAdmin, deleteDistrict); 


branchRouter.post("/add-branch", islogin, isAdmin, addBranch); 
branchRouter.get("/get-branch", getBranch); 
branchRouter.delete("/delete-branch/:id", islogin, isAdmin, deleteBranch); 
branchRouter.patch("/edit-branch/:id", islogin, isAdmin, updateBranch); 
