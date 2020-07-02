"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const Scraper_1 = tslib_1.__importDefault(require("./Scraper"));
const router = express_1.Router();
router.use('/scraper', Scraper_1.default);
exports.default = router;
