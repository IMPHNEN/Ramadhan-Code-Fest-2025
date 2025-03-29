import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        location: true
      }
    });
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
};

export const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        location: true
      }
    });

    if (!restaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant' });
  }
};

export const getRestaurantsByLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { locationId } = req.params;
    const restaurants = await prisma.restaurant.findMany({
      where: { locationId },
      include: {
        location: true
      }
    });

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants by location:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants by location' });
  }
};

export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurantData = req.body;
    
    const locationExists = await prisma.location.findUnique({
      where: { id: restaurantData.locationId }
    });
    
    if (!locationExists) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }
    
    const newRestaurant = await prisma.restaurant.create({
      data: restaurantData,
      include: {
        location: true
      }
    });
    
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
};

export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const restaurantData = req.body;
    
    const restaurant = await prisma.restaurant.findUnique({
      where: { id }
    });
    
    if (!restaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }
    
    if (restaurantData.locationId) {
      const locationExists = await prisma.location.findUnique({
        where: { id: restaurantData.locationId }
      });
      
      if (!locationExists) {
        res.status(404).json({ error: 'Location not found' });
        return;
      }
    }
    
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id },
      data: restaurantData,
      include: {
        location: true
      }
    });
    
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
};

export const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const restaurant = await prisma.restaurant.findUnique({
      where: { id }
    });
    
    if (!restaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }
    
    await prisma.restaurant.delete({
      where: { id }
    });
    
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
};