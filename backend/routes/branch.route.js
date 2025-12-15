import express from "express";
import {
  addBranch,
  addDistrict,
  addProvince,
  deleteBranch,
  deleteDistrict,
  deleteProvince,
  editBranch,
  getBranch,
  getDistrictByProvince,
  getProvince,
} from "../controller/branch.controller.js";
export const branchRouter = express.Router();
branchRouter.post("/add-province", addProvince);
branchRouter.get("/get-province", getProvince);
branchRouter.delete("/delete-province/:id", deleteProvince);

branchRouter.post("/add-district/:province_id", addDistrict);
branchRouter.get("/get-district", getDistrictByProvince);
branchRouter.delete("/delete-district/:id", deleteDistrict);

branchRouter.post("/add-branch", addBranch);
branchRouter.get("/get-branch", getBranch);
branchRouter.delete("/delete-branch/:id", deleteBranch);
branchRouter.patch("/edit-branch", editBranch);
