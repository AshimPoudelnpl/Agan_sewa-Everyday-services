import express from 'express';
import { addServices, deleteService, getServices, updateService } from '../controller/service.controller.js';
import { uploadService } from '../utils/multerHandler.js';
import islogin from '../middleware/Islogin.js';
import { isAdmin } from '../middleware/IsAdmin.js';

const serviceRouter = express.Router();

serviceRouter.post('/add-service', islogin, isAdmin, uploadService.single("image"), addServices); 
serviceRouter.get('/get-service', getServices); 
serviceRouter.delete('/delete-service/:id', islogin, isAdmin, deleteService); 
serviceRouter.patch('/update-service/:id', islogin, isAdmin, updateService); 
export default serviceRouter;