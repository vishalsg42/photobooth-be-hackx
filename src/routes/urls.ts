import  express from 'express';
import HealthController from '../controllers/health.controller';
import MediaFilesController from '../controllers/files.controller';

const router = express.Router();

const healthController = new HealthController();
healthController.register(router);

const mediaFilesController = new MediaFilesController();
mediaFilesController.register(router);

export default router;
