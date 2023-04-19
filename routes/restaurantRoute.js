import express from "express"
import { addRestaurant, deleteRestaurant, getRestaurants, updateRestaurant } from "../controllers/restaurantController.js";

const route = express.Router();

route.post('/restaurant', addRestaurant);
route.get('/restaurant', getRestaurants);
route.put('/restaurant/:id', updateRestaurant);
route.delete('/restaurant/:id', deleteRestaurant);


export default route;