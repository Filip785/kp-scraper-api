import { Request, Response, Router } from 'express';
import xlsx from 'xlsx';
import parseData from '../services/kp-scraper';
import shortid from 'shortid';
import { format } from 'date-fns';
import fs from 'fs';

function getFileSize(filePath: string) {
  const stats = fs.statSync(filePath);
  
  const { size } = stats;

  // convert to human readable format.
  const i = Math.floor(Math.log(size) / Math.log(1024));
  const calc = Number((size / Math.pow(1024, i)).toFixed(2));
  return calc + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}

// Init shared
const router = Router();

router.get('/gpu', async (req: Request, res: Response) => {
  const numOfPages = Number(req.query.numOfPages);
  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);

  const wb = xlsx.utils.book_new();
  await parseData(wb, numOfPages, minPrice, maxPrice);
  const fileName = `result-gpu-${shortid.generate()}.xlsx`;
  const filePath = __dirname + `/../public/workbooks/${fileName}`;
  xlsx.writeFile(wb, filePath);

  const dateTimeCreated = new Date();

  const timeCreated = format(dateTimeCreated, 'hh:mm:ss a');
  const dateCreated = format(dateTimeCreated, 'dd.MM.yyyy');
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
