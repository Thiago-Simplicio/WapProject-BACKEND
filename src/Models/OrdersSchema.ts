import mongoose, {Schema, model} from 'mongoose';

interface Order {
    subscribe_id: string | any;
    plans_id: string | any;
}

const OrderSchema = new Schema({
    subscribe_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    plans_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Plans',
        required: true
    }
}, {
    timestamps: true
});

export default model<Order>('Orders', OrderSchema);