import { Request, Response, Router } from 'express';
import xlsx from 'xlsx';
import parseData from '../services/scraper';

// Init shared
const router = Router();

router.get('/gpu', async (req: Request, res: Response) => {
  // create workbook

  // parse data

  // create file

  // return the file name & download link to the user 

  return res.json({
    res: 'ok'
  }).status(200);
});

export default router;
