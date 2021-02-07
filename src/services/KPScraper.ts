import { parse } from 'node-html-parser';
import AdListing from './AdListing';
import { XLSXDocumentBuilder } from "./XLSXDocumentBuilder";

export default class KPScraper {
    private minPrice: number;
    private maxPrice: number;
    private searchTerms: Array<string>;

    private adCount: number;
    private xlsxDocumentBuilder: XLSXDocumentBuilder;

    constructor(minPrice: number, maxPrice: number, searchTerms: Array<string>) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.searchTerms = searchTerms;

        this.adCount = 0;
        this.xlsxDocumentBuilder = new XLSXDocumentBuilder();
    }

    parseData(html: string, pageNumber: number): void {
        const root = parse(html);

        const namesForPage = root.querySelectorAll('.adName');
        const pricesForPage = root.querySelectorAll('.adPrice');
        const length = namesForPage.length;

        for (let y = 0; y < length; y++) {
            const nameItem = namesForPage[y].text.trim();

            if (!this.searchTerms.some(subString => nameItem.includes(subString))) {
                continue;
            }

            const priceItem = pricesForPage[y].text.trim();
            const link = `https://www.kupujemprodajem.com${namesForPage[y].getAttribute('href')}`;

            const adListing = new AdListing(priceItem, this.minPrice, this.maxPrice);

            const price = adListing.getPrice();

            if (!price) {
                continue;
            }

            this.adCount++;

            this.xlsxDocumentBuilder.addWSDataItem(nameItem, price.toString(), link);
        }

        this.xlsxDocumentBuilder.addEntry(pageNumber);
    }

    getDocumentWriter(): XLSXDocumentBuilder {
        return this.xlsxDocumentBuilder;
    }

    getAdCount(): number {
        return this.adCount;
    }
}