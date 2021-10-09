import  express from 'express';
import HealthController from '../controllers/health.controller';

const router = express.Router();
const healthController = new HealthController();
healthController.register(router);

export default router;