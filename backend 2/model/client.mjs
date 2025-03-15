import mongoose from "mongoose";
import Order from "./order.mjs";

const clientSchema = new mongoose.Schema({
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
        required: false,
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
    role: {
        type: String,
        default: 'client',
    },
    picture: {
        type: String,
        required: true,
    },
});

clientSchema.pre('findOneAndDelete', async function (next) {
    await Order.deleteMany({ client: this._conditions._id });
    next();
});

const Client = mongoose.model('Client', clientSchema);
export default Client;