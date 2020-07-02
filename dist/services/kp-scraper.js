"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const xlsx_1 = tslib_1.__importDefault(require("xlsx"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const node_html_parser_1 = require("node-html-parser");
function parseData(wb, numOfPages, minPrice, maxPrice) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (let x = 1; x <= numOfPages; x++) {
            const wsName = `KP Stranica ${x}`;
            const wsData = [
                ['Ime', 'Cena', 'Link']
            ];
            const result = yield node_fetch_1.default(`https://www.kupujemprodajem.com/Kompjuteri-Desktop/Graficke-kartice/10-102-${x}-grupa.htm`);
            const html = yield result.text();
            const root = node_html_parser_1.parse(html);
            const namesForPage = root.querySelectorAll('.adName');
            const pricesForPage = root.querySelectorAll('.adPrice');
            const length = namesForPage.length;
            for (let y = 0; y < length; y++) {
                const nameItem = namesForPage[y].text.trim();
                if (!nameItem.includes('580') && !nameItem.includes('590')) {
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
                }
                else {
                    if (price < minPrice || price > maxPrice) {
                        continue;
                    }
                }
                wsData.push([nameItem, price.toString(), link]);
            }
            const ws = xlsx_1.default.utils.aoa_to_sheet(wsData);
            xlsx_1.default.utils.book_append_sheet(wb, ws, wsName);
        }
    });
}
exports.default = parseData;
