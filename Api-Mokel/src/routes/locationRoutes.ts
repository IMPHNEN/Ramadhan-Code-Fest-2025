import { Router } from 'express';
import {
  getAllLocations,
  getLocationById,
  createLocation,
  createManyLocation,
  updateLocation,
  deleteLocation
} from '../controllers/locationController';

const router = Router();

router.get('/', getAllLocations);
router.get('/:id', getLocationById);
router.post('/', createLocation);
router.post('/many', createManyLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export default router;