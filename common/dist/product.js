"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.addProduct = void 0;
const zod_1 = __importDefault(require("zod"));
exports.addProduct = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    price: zod_1.default.number(),
    image: zod_1.default.string()
});
exports.updateProduct = zod_1.default.object({
    id: zod_1.default.number(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    price: zod_1.default.number(),
    image: zod_1.default.string()
});
