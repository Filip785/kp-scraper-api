export enum CurrencyType {
    SERBIAN_DINAR = 0,
    EURO = 1,
    UNKNOWN = 2
}

export default class AdListing {
    private _price: number | null = 0;
    private _currency: CurrencyType = CurrencyType.UNKNOWN;

    constructor(priceItem: string, minPrice: number, maxPrice: number) {
        this.setCurrency(priceItem);
        this.setPrice(priceItem, minPrice, maxPrice);
    }

    private setPrice(priceItem: string, minPrice: number, maxPrice: number): void {
        if (this._currency === CurrencyType.UNKNOWN) {
            this._price = null;

            return;
        }

        let price = 0;

        if (this._currency === CurrencyType.SERBIAN_DINAR) {
            price = parseFloat(priceItem.replace('.', ''));
            
            price = Number((price * 0.00850770).toFixed(2));
        }

        if (this._currency === CurrencyType.EURO) {
            price = parseFloat(priceItem.replace(',', '.'));
        }

        if (price < minPrice || price > maxPrice) {
            this._price = null;

            return;
        }

        this._price = price;
    }

    getPrice(): number | null {
        return this._price;
    }

    private setCurrency(priceItem: string): void {
        if (priceItem.includes('din')) {
            this._currency = CurrencyType.SERBIAN_DINAR;
        }

        if (priceItem.includes('€')) {
            this._currency = CurrencyType.EURO;
        }
    }

    getCurrency(): CurrencyType {
        return this._currency;
    }
}