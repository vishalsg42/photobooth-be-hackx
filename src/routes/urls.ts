import  express from 'express';
import HealthController from '../controllers/health.controller';
import MediaFilesController from '../controllers/files.controller';
import FramesController from '../controllers/frames.controller';
import EmailsController from '../controllers/emails.controller';

const router = express.Router();

const healthController = new HealthController();
healthController.register(router);

const mediaFilesController = new MediaFilesController();
mediaFilesController.register(router);

const framesController = new FramesController();
framesController.register(router);

const emailsController = new EmailsController();
emailsController.register(router);

export default router;
