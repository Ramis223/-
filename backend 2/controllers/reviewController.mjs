import Review from '../model/review.mjs';
import Client from '../model/client.mjs';
import Master from '../model/master.mjs';

export default class ReviewController {
    // Создание отзыва
    static async createReview(req, res) {
        try {
            const { clientId, masterId, rating, comment } = req.body;

            // Проверка, что клиент и мастер существуют
            const client = await Client.findById(clientId);
            const master = await Master.findById(masterId);

            if (!client || !master) {
                return res.status(404).json({ msg: 'Клиент или мастер не найдены' });
            }

            // Создание отзыва
            const review = new Review({
                client: clientId,
                master: masterId,
                rating,
                comment,
            });

            await review.save();
            res.status(201).json({ msg: 'Отзыв создан', review });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // Получение отзывов для мастера
    static async getReviewsByMaster(req, res) {
        try {
            const { masterId } = req.params;

            // Проверка, что мастер существует
            const master = await Master.findById(masterId);
            if (!master) {
                return res.status(404).json({ msg: 'Мастер не найден' });
            }

            // Получение отзывов
            const reviews = await Review.find({ master: masterId }).populate('client', 'name surname');
            res.json(reviews);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    // Удаление отзыва
    static async deleteReview(req, res) {
        try {
            const { reviewId } = req.params;

            // Удаление отзыва
            await Review.findByIdAndDelete(reviewId);
            res.status(200).json({ msg: 'Отзыв удалён' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}