"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FoodResolver_1 = __importDefault(require("../graphql/src_food/resolvers/FoodResolver"));
const InfoDeathResolver_1 = __importDefault(require("../graphql/src_food/resolvers/InfoDeathResolver"));
const CancerResolver_1 = __importDefault(require("../graphql/src_food/resolvers/CancerResolver"));
const AllCancerResolver_1 = __importDefault(require("../graphql/src_food/resolvers/AllCancerResolver"));
function getAllResolvers() {
    return [
        FoodResolver_1.default,
        InfoDeathResolver_1.default,
        CancerResolver_1.default,
        AllCancerResolver_1.default
    ];
}
exports.default = getAllResolvers;
