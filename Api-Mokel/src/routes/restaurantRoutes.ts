import express, { Router, Request, Response } from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantsByLocation,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurantController';

const router = Router();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.get('/location/:locationId', getRestaurantsByLocation);
router.post('/', createRestaurant);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

export default router;