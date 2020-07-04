import { Request, Response, Router } from 'express';
import xlsx from 'xlsx';
import parseData from '../services/kp-scraper';
import generateDateTime from '../shared/datetime-generator';
import getFileSize from '../shared/filesize-helper';
import getFilePathAndName from '../shared/filepath-helper';

const router = Router();

router.get('/get-part-data', async (req: Request, res: Response) => {
  const partType = req.query.partType as string;
  const numOfPages = Number(req.query.numOfPages);
  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);
  const searchTerms = req.query.searchTerms as string[];

  const wb = xlsx.utils.book_new();

  await parseData(wb, partType, numOfPages, minPrice, maxPrice, searchTerms);

  const { fileName, filePath } = getFilePathAndName(partType);

  xlsx.writeFile(wb, filePath);
  
  const { dateCreated, timeCreated } = generateDateTime();
  const fileSize = getFileSize(filePath);

  return res.json({
    fileName,
    dateCreated,
    timeCreated,
    fileSize,
    downloadUrl: `${process.env.API_DOMAIN}workbooks/${fileName}`
  }).status(200);
});

export default router;
