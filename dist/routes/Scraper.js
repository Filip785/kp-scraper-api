"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const xlsx_1 = tslib_1.__importDefault(require("xlsx"));
const kp_scraper_1 = tslib_1.__importDefault(require("../services/kp-scraper"));
const router = express_1.Router();
router.get('/gpu', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const numOfPages = Number(req.query.numOfPages);
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const wb = xlsx_1.default.utils.book_new();
    yield kp_scraper_1.default(wb, numOfPages, minPrice, maxPrice);
    xlsx_1.default.writeFile(wb, __dirname + '/../public/workbooks/result.xlsx');
    return res.json({
        downloadUrl: 'http://localhost:5000/workbooks/result.xlsx'
    }).status(200);
}));
exports.default = router;
