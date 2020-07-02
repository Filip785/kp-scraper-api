import { Request, Response, Router } from 'express';
import xlsx from 'xlsx';
import parseData from '../services/kp-scraper';

// Init shared
const router = Router();

router.get('/gpu', async (req: Request, res: Response) => {
  const numOfPages = Number(req.query.numOfPages);
  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);

  const wb = xlsx.utils.book_new();
  await parseData(wb, numOfPages, minPrice, maxPrice);

  xlsx.writeFile(wb, __dirname + '/../public/workbooks/result.xlsx');

  return res.json({
    downloadUrl: 'https://ancient-gorge-59721.herokuapp.com/workbooks/result.xlsx'
  }).status(200);
});

export default router;
