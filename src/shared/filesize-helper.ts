import fs from 'fs';

export default function getFileSize(filePath: string) {
  const stats = fs.statSync(filePath);

  const { size } = stats;

  // convert to human readable format.
  const i = Math.floor(Math.log(size) / Math.log(1024));
  const calc = Number((size / Math.pow(1024, i)).toFixed(2));
  
  return calc + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}