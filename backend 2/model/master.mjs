import mongoose from "mongoose";

const masterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    patronymic: {
        type: String,
    },
    telephone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        enum: ["Мойка", "Полировка", "Защита кузова", "Химчистка салона", "Покрытие керамикой"],
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
});

const Master = mongoose.model('Master', masterSchema);
export default Master;  