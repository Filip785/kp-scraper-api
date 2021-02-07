import AdListing, { CurrencyType } from 'src/services/AdListing';

describe('AdListing', () => {
    describe('getCurrencyType', () => {
        it('returns price correctly when price type is EUR', () => {
            const adListing = new AdListing('150,00 €', 100, 150);

            expect(adListing.getCurrency()).toBe(CurrencyType.EURO);
        });

        it('returns currency type correctly when price type is Serbian Dinar', () => {
            const adListing = new AdListing('13.000 din', 100, 150);

            expect(adListing.getCurrency()).toBe(CurrencyType.SERBIAN_DINAR);
        });

        it('returns currency type correctly when price type is Unknown', () => {
            const adListing = new AdListing('Kontakt', 100, 150);

            expect(adListing.getCurrency()).toBe(CurrencyType.UNKNOWN);
        });
    });

    describe('getPrice', () => {
        it('returns price correctly when price type is EUR and price is not halved', () => {
            const adListing = new AdListing('120 €', 100, 150)

            const actual = adListing.getPrice();
            const expected = 120;

            expect(actual).toBe(expected);
        });

        it('returns price correctly when price type is EUR and price is halved', () => {
            const adListing = new AdListing('120,50 €', 100, 150)

            const actual = adListing.getPrice();
            const expected = 120.5;

            expect(actual).toBe(expected);
        });

        it('returns price correctly when price type is Serbian Dinar', () => {
            const adListing = new AdListing('13.000 din', 100, 150)

            const actual = adListing.getPrice();
            const expected = 110.6;

            expect(actual).toBe(expected);
        });

        it('returns price correctly when price type is Unknown', () => {
            const adListing = new AdListing('Kontakt', 100, 150)

            const actual = adListing.getPrice();

            expect(actual).toBeNull();
        });

        it('returns price correctly when price type is Unknown and price is larger then maxPrice', () => {
            const adListing = new AdListing('151,00 €', 100, 150)

            const actual = adListing.getPrice();

            expect(actual).toBeNull();
        });

        it('returns price correctly when price type is Unknown and price is lower then minPrice', () => {
            const adListing = new AdListing('99,00 €', 100, 150)

            const actual = adListing.getPrice();
            
            expect(actual).toBeNull();
        });
    });
});