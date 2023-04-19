import mongoose from "mongoose";
import Restaurent from "../models/restaurantModel.js";

const addRestaurant = async (req, res) => {

    try {
        const { name, description, location, id } = req.body;
        if (!name || !description || !location || !id) {
            return res.status(400).json({
                message: "Please fill all the required field."
            });
        }
        const existRestaurant = await Restaurent.findOne({ id });
        if (existRestaurant) {
            return res.status(409).json({
                error: true,
                message: "Restaurant Id already exist."
            });
        }
        const restaurant = await Restaurent.create({ name, description, location, id });

        res.status(201).json({
            error: false,
            restaurant,
            message: "Restaurant Registered Successfully.."
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: "Internal Server Error."
        });
    }
}

const getRestaurants = async (req, res) => {
    try {
        const { longitude, latitude, radius } = req.body;
        const restaurant = await Restaurent.find();
        if (latitude && latitude && radius) {
            const result = restaurant.filter((item) => {
                const distance = calculateresult(item.location.latitude, item.location.longitude, latitude, longitude);
                if (distance < radius) {
                    return item;
                }
            })
            return res.status(200).json({
                data: result,
                message: "Successfully find."
            });
        }
        res.status(200).json({
            data: restaurant,
            message: "Successfully find."
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: "Internal Server Error."
        });
    }
}

const updateRestaurant = async (req, res) => {

    try {
        const { name, description, location } = req.body;
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ message: "Restaurant Id is not Valid" });
        const restaurant = await Restaurent.findByIdAndUpdate(id, { name, description, location }, { new: true })
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }
        res.status(200).json({
            data: restaurant,
            message: "Update Successfully."
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: "Internal Server Error."
        });
    }
}

const deleteRestaurant = async (req, res) => {

    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ message: "Restaurant Id is not Valid" });
        const restaurant = await Restaurent.findByIdAndDelete(id);
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }
        res.status(200).json({
            message: "Deleted Successfully."
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: "Internal Server Error."
        });
    }
}

const calculateresult = (lat1, lon1, lat2, lon2) => {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742000000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export { addRestaurant, getRestaurants, deleteRestaurant, updateRestaurant };