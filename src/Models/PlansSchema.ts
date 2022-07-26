import { Schema, model } from 'mongoose';

interface Plans {
    name_plan?: string | any;
    description_plan?: string | any;
    value_plan?: string | any | number;
}

const PlansSchema = new Schema({
    name_plan: {
        type: String,
        required: true
    },
    description_plan: {
        type: String
    },
    value_plan: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model<Plans>('Plans', PlansSchema);