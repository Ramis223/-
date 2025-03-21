import express from 'express';
import AdminController from '../controllers/AdminController.mjs'; // Убедитесь, что путь правильный
import { authToken, isAdmin } from '../middleware/authToken.mjs';

const router = express.Router();

// Защищённые маршруты для администратора
router.post('/create_master', authToken, isAdmin, AdminController.createMaster);
router.get('/load_masters', authToken, isAdmin, AdminController.loadMasters);
router.put('/update_master/:id', authToken, isAdmin, AdminController.updateMaster);
router.delete('/delete_master/:id', authToken, isAdmin, AdminController.deleteMaster);
router.post('/create_service', authToken, isAdmin, AdminController.createService);
router.put('/update_service/:id', authToken, isAdmin, AdminController.updateService);
router.delete('/delete_client/:id', authToken, isAdmin, AdminController.deleteClient);
router.get('/search_clients', authToken, isAdmin, AdminController.searchClientsBySurname);

export default router;