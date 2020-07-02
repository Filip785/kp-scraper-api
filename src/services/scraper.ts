import xlsx, { WorkBook } from 'xlsx';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

export default async function parseData(wb: WorkBook, numOfPages: number, minPrice: number, maxPrice: number) {
  for (let x = 1; x <= numOfPages; x++) {
    const wsName = `KP Stranica ${x}`;
    const wsData = [
      ['Ime', 'Cena', 'Link']
    ];
  
    const result = await fetch(`https://www.kupujemprodajem.com/Kompjuteri-Desktop/Graficke-kartice/10-102-${x}-grupa.htm`);
    const html = await result.text();
  
    const root = parse(html);
  
    const namesForPage = root.querySelectorAll('.adName');
    const pricesForPage = root.querySelectorAll('.adPrice');
    const length = namesForPage.length;
  
    for (let y = 0; y < length; y++) {
      const nameItem = namesForPage[y].text.trim();
      
      if(!nameItem.includes('580') && !nameItem.includes('590')) {
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
  
      wsData.push([nameItem, price.toString(), link]);
    }
  
    const ws = xlsx.utils.aoa_to_sheet(wsData);
    xlsx.utils.book_append_sheet(wb, ws, wsName);
  }
}

module.exports = { parseData };