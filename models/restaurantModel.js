import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    location: {
        longitude: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        }
    },
    ratings: [
        {
            name: {
                type: String,
                required: true
            },
            review: [
                {
                    message: {
                        type: String
                    }
                }
            ],
            rate: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ],
    id: {
        type: Number,
        unique: true,
        required: true
    }
});

const restaurent = mongoose.model('restaurant', restaurantSchema);

export default restaurent;