import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ["Мойка", "Полировка", "Защита кузова", "Химчистка салона", "Покрытие керамикой"],
    },
    cost: {
        type: Number,
        min: 0,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;