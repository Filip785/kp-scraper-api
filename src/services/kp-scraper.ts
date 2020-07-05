import xlsx, { WorkBook } from 'xlsx';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

export default async function parseData(wb: WorkBook, partType: string, numOfPages: number, minPrice: number, maxPrice: number, searchTerms: Array<string>): Promise<number> {
  let searchString = 'https://www.kupujemprodajem.com/kompjuteri-desktop/graficke-kartice/grupa/10/102/';

  switch (partType) {
    case 'cpu':
      searchString = 'https://www.kupujemprodajem.com/kompjuteri-desktop/procesori/grupa/10/94/';
      break;
    case 'ssd':
      searchString = 'https://www.kupujemprodajem.com/kompjuteri-desktop/hard-diskovi-ssd/grupa/10/1350/';
      break;
  }

  let adCount = 0;

  for (let x = 1; x <= numOfPages; x++) {
    const wsName = `KP Stranica ${x}`;
    const wsData = [
      ['Ime', 'Cena', 'Link']
    ];

    const result = await fetch(`${searchString}${x}`);
    const html = await result.text();
  
    const root = parse(html);
  
    const namesForPage = root.querySelectorAll('.adName');
    const pricesForPage = root.querySelectorAll('.adPrice');
    const length = namesForPage.length;
  
    for (let y = 0; y < length; y++) {
      const nameItem = namesForPage[y].text.trim();
      
      if(!searchTerms.some(subString => nameItem.includes(subString))) {
        continue;
      }

      const priceItem = pricesForPage[y].text.trim();
      const link = `https://www.kupujemprodajem.com${namesForPage[y].getAttribute('href')}`;
      const currency = priceItem.includes('din') ? 0 : priceItem.includes('€') ? 1 : 2;
      let price = currency === 2 ? priceItem : parseFloat(priceItem.replace('.', ''));
  
      if (currency === 0 && typeof price === 'number') {
        price = Number((price * 0.00850770).toFixed(2));
      }
  
      if (currency === 2) {
        continue;
      } else {
        if (price < minPrice || price > maxPrice) {
          continue;
        }
      }

      adCount++;
  
      wsData.push([nameItem, price.toString(), link]);
    }
  
    const ws = xlsx.utils.aoa_to_sheet(wsData);
    xlsx.utils.book_append_sheet(wb, ws, wsName);
  }

  return adCount;
}