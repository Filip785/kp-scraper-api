import { Router } from 'express';
import ScraperRouter from './Scraper';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/scraper', ScraperRouter);

// Export the base-router
export default router;
