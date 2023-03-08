"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const infoGraphicCancerIncidentSchema = new mongoose_1.Schema({
    Year: String,
    Locationabbr: String,
    Locationdesc: String,
    Topic: String,
    Gender: String,
    ageGroup: String,
    ageLabel: String,
    Race: String,
    Count: String,
    CountInNumber: Number,
    Population: String,
    PopulationInNumber: Number,
    CrudeRate: String,
    CrudeRateInNumber: Number,
    diseaseLabelMale: String,
    diseaseLabelFemale: String,
});
const InfoGraphicCancerIncident = (0, mongoose_1.model)('infoGraphicCancerIncident', infoGraphicCancerIncidentSchema);
exports.default = InfoGraphicCancerIncident;
