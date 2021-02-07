import getSearchString from '@shared/get-search-string';
import fetch from 'node-fetch';
import shortid from 'shortid';
import KPScraper from './KPScraper';

interface ParseDataReturn {
  adCount: number;
  fileName: string;
  fileSize: string;
}

async function fetchPage(pageUrl: string) {
  const result = await fetch(pageUrl);
  const html = await result.text();

  return html;
}

export default async function parseData(partType: string, numOfPages: number, minPrice: number, maxPrice: number, searchTerms: Array<string>): Promise<ParseDataReturn> {
  const searchString = getSearchString(partType);

  const parser = new KPScraper(minPrice, maxPrice, searchTerms);

  for (let pageNumber = 1; pageNumber <= numOfPages; pageNumber++) {
    parser.parseData(await fetchPage(`${searchString}${pageNumber}`), pageNumber);
  }

  const documentWriter = parser.getDocumentWriter();

  documentWriter.write(partType, shortid.generate());

  return {
    adCount: parser.getAdCount(),
    fileName: documentWriter.getFileName(),
    fileSize: documentWriter.getFileSize()
  };
}