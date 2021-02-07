import { Request, Response, Router } from 'express';
import parseData from '../services/scraping-service';
import generateDateTime from '../shared/datetime-generator';

const router = Router();

router.get('/get-part-data', async (req: Request, res: Response) => {
  const partType = req.query.partType as string;
  const numOfPages = Number(req.query.numOfPages);
  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);
  const searchTerms = req.query.searchTerms as string[];

  const { adCount, fileName, fileSize } = await parseData(partType, numOfPages, minPrice, maxPrice, searchTerms);
  
  const { dateCreated, timeCreated } = generateDateTime();

  return res.json({
    fileName,
    adCount,
    dateCreated,
    timeCreated,
    fileSize,
    downloadUrl: `${process.env.API_DOMAIN}workbooks/${fileName}`
  }).status(200);
});

export default router;
