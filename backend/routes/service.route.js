import express from 'express';
import { addServices, deleteService, getServices, updateService } from '../controller/service.controller.js';
import {  uploadService } from '../utils/multerHandler.js';
import islogin from '../middleware/Islogin.js';
import { authorizeRoles } from '../middleware/Role.js';


const serviceRouter = express.Router();
serviceRouter.post('/add-service', islogin, authorizeRoles("admin"), uploadService.single("image"), addServices);
serviceRouter.get('/get-service', getServices);
serviceRouter.delete('/delete-service/:id', islogin, authorizeRoles("admin"), deleteService);
serviceRouter.patch('/update-service/:id', islogin, authorizeRoles("admin"), updateService);
export default serviceRouter;