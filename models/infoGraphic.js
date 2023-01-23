"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const infoGraphicSchema = new mongoose_1.Schema({
    Year: String,
    Locationabbr: String,
    Locationdesc: String,
    Class: String,
    Topic: String,
    Break_Out: String,
    Break_Out_Category: String,
    Category: String,
    Sample_Size: String,
    Sample_Size_Number: Number,
    Data_value: String,
    Data_value_Number: Number,
    Actual_Data_Value_Number: Number,
    Confidence_limit_Low: String,
    Confidence_limit_High: String,
    Data_value_unit: String,
});
const InfoGraphic = (0, mongoose_1.model)('infoGraphic', infoGraphicSchema);
exports.default = InfoGraphic;
