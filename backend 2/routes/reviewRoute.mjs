import express from 'express';
import ReviewController from '../controllers/reviewController.mjs';
import { authToken } from '../middleware/authToken.mjs';

const router = express.Router();

// Создание отзыва
router.post('/create', authToken, ReviewController.createReview);

// Получение отзывов для мастера
router.get('/master/:masterId', authToken, ReviewController.getReviewsByMaster);

// Удаление отзыва
router.delete('/:reviewId', authToken, ReviewController.deleteReview);

export default router;