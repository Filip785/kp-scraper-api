import { Router } from 'express';
import UserRouter from './Users';
import ScraperRouter from './Scraper';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/scraper', ScraperRouter);

// Export the base-router
export default router;
