import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    date_purchase: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    }],
    master: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master',
        required: true,
    },
    appointment_date: {
        type: Date,
        required: true,
    },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;