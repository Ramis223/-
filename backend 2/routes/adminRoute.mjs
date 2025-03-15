import express from 'express';
import AdminController from '../controllers/AdminController.mjs';
import { authToken, isAdmin } from '../middleware/authToken.mjs';
import { validateMaster, validateService } from '../middleware/validators.mjs';

const router = express.Router();

// Защищённые маршруты для администратора
router.post('/create_master', authToken, isAdmin, validateMaster, AdminController.createMaster);
router.get('/load_masters', authToken, isAdmin, AdminController.loadMasters);
router.put('/update_master/:id', authToken, isAdmin, validateMaster, AdminController.updateMaster);
router.delete('/delete_master/:id', authToken, isAdmin, AdminController.deleteMaster);
router.post('/create_service', authToken, isAdmin, validateService, AdminController.createService);
router.put('/update_service/:id', authToken, isAdmin, validateService, AdminController.updateService);
router.delete('/delete_client/:id', authToken, isAdmin, AdminController.deleteClient);
router.get('/search_clients', authToken, isAdmin, AdminController.searchClientsBySurname);

export default router;