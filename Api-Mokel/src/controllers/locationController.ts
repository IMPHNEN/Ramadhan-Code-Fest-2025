import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllLocations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const locations = await prisma.location.findMany({
      include: {
        restaurants: true,
      },
    });
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

export const getLocationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const location = await prisma.location.findUnique({
      where: { id },
      include: {
        restaurants: true,
      },
    });

    if (!location) {
      res.status(404).json({ error: "Location not found" });
      return;
    }

    res.status(200).json(location);
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({ error: "Failed to fetch location" });
  }
};

export const createLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const locationData = req.body;

    const newLocation = await prisma.location.create({
      data: locationData,
    });

    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error creating location:", error);
    res.status(500).json({ error: "Failed to create location" });
  }
};

export const createManyLocation = async (req: Request, res: Response): Promise<void> => {
    try {
      const locations = req.body; 
  
      if (!Array.isArray(locations) || locations.length === 0) {
        res.status(400).json({ error: "Invalid data format, expected an array of locations" });
        return;
      }
  
      const createdLocations = await prisma.location.createMany({
        data: locations,
        // skipDuplicates: true, 
      });
  
      res.status(201).json({
        message: "Locations added successfully",
        count: createdLocations.count,
      });
    } catch (error) {
      console.error("Error creating locations:", error);
      res.status(500).json({ error: "Failed to create locations" });
    }
  };

export const updateLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const locationData = req.body;

    const updatedLocation = await prisma.location.update({
      where: { id },
      data: locationData,
    });

    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ error: "Failed to update location" });
  }
};

export const deleteLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.location.delete({
      where: { id },
    });

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({ error: "Failed to delete location" });
  }
};
