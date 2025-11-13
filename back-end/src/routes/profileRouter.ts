import ProfileController from '../controllers/profileController';
import { wrapException } from '../utils/wrapException';
import express from 'express';

const router = express.Router();

router.get('/profiles', wrapException(ProfileController.listProfilesController));

export default router;
