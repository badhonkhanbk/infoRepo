"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const newAllCancerSchema = new mongoose_1.Schema({
    Year: String,
    Locationabbr: String,
    AGE_ADJUSTED_CI_LOWER: String,
    AGE_ADJUSTED_CI_UPPER: String,
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
    type: String,
    cnt: Number,
    SITE: String,
    CRUDE_CI_LOWER: String,
    CRUDE_CI_UPPER: String,
    RACE_UI: String,
    RACE_ORIGIN: String,
});
const NewAllCancer = (0, mongoose_1.model)('newAllCancer', newAllCancerSchema);
exports.default = NewAllCancer;
// let obj = {
//   Locationdesc: data[i].Locationdesc, // done
//   AGE_ADJUSTED_CI_LOWER: data[i].AGE_ADJUSTED_CI_LOWER,
//   AGE_ADJUSTED_CI_UPPER: data[i].AGE_ADJUSTED_CI_UPPER,
//   CrudeRateInNumber: Number(data[i].CrudeRate), // done
//   Count: data[i].Count, // done
//   CountInNumber: Number(data[i].Count), // done
//   type: data[i].type, // done
//   Population: data[i].Population, // done
//   PopulationInNumber: Number(data[i].Population),
//   Race: data[i].Race, // done
//   Gender: data[i].Gender, // done
//   SITE: data[i].SITE,
//   Year: data[i].Year,
//   CRUDE_CI_LOWER: data[i].CRUDE_CI_LOWER,
//   CRUDE_CI_UPPER: data[i].CRUDE_CI_UPPER,
//   CrudeRate: data[i].CrudeRate, // done
//   Locationabbr: data[i].Locationabbr, // done
//   Topic: data[i].Topic, // done
//   RACE_UI: data[i].RACE_UI,
//   cnt: i,
//   diseaseLabelMale: data[i].Gender === 'Male' ? data[i].Topic : null,
//   diseaseLabelFemale: data[i].Gender === 'Female' ? data[i].Topic : null,
// };
