"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const CancerIncident_1 = __importDefault(require("../../../models/CancerIncident"));
const CancerDeath_1 = __importDefault(require("../../../models/CancerDeath"));
const ProportionGender_1 = __importDefault(require("../schemas/ProportionGender"));
const ProportionGenderString_1 = __importDefault(require("../schemas/ProportionGenderString"));
const stateAndAbbreviations_1 = __importDefault(require("../../../utils/stateAndAbbreviations"));
let race = [
    'American Indian or Alaska Native',
    'Asian or Pacific Islander',
    'Black or African American',
    'Hispanic',
    'Other Races and Unknown combined',
    'White',
];
let maleDiseasesForCancer = [
    'Bladder',
    'Brain',
    'Colorectal',
    'Esophagus',
    'Gallbladder',
    'Kidney',
    'Leukemias',
    'Liver',
    'Lung',
    'Lymphoma',
    'Myeloma',
    'Oral',
    'Pancreas',
    'Prostate',
    'Skin',
    'Stomach',
    'Throat',
    'Thyroid',
];
let selectedMaleDisesasesForCancer = [
    'Bladder',
    'Brain',
    'Colorectal',
    'Esophagus',
    'Leukemias',
    'Liver',
    'Lung',
    'Lymphoma',
    'Pancreas',
    'Prostate', // include
];
let femaleDiseasesForCancer = [
    'Bladder',
    'Brain',
    'Breast',
    'Cervix',
    'Colorectal',
    'Corpus',
    'Esophagus',
    'Gallbladder',
    'Kidney',
    'Leukemias',
    'Liver',
    'Lung',
    'Lymphoma',
    'Myeloma',
    'Oral',
    'Ovary',
    'Pancreas',
    'Skin',
    'Stomach',
    'Thyroid',
];
let selectedFemaleDisesasesForCancer = [
    'Brain',
    'Breast',
    'Cervix',
    'Colorectal',
    'Leukemias',
    'Liver',
    'Lung',
    'Lymphoma',
    'Ovary',
    'Pancreas', // include
];
let maleDisease = [
    'Brain',
    'Breast',
    'Colorectal',
    'Esophagus',
    'Gallbladder',
    'Kidney',
    'Larynx',
    'Leukemias',
    'Liver',
    'Lung',
    'Melanoma of the Skin',
    'Myeloma',
    'Non-Hodgkin Lymphoma',
    'Oral Cavity and Pharynx',
    'Pancreas',
    'Prostate',
    'Stomach',
    'Thyroid',
    'Urinary Bladder', //include
];
let selectedMaleDiseases = [
    'Colorectal',
    'Kidney',
    'Leukemias',
    'Lung',
    'Melanoma of the Skin',
    'Non-Hodgkin Lymphoma',
    'Oral Cavity and Pharynx',
    'Pancreas',
    'Prostate',
    'Urinary Bladder', //include
];
let femaleDisease = [
    'Brain',
    'Breast',
    'Cervix',
    'Colorectal',
    'Corpus Uteri',
    'Esophagus',
    'Gallbladder',
    'Kidney',
    'Larynx',
    'Leukemias',
    'Liver',
    'Lung',
    'Melanoma of the Skin',
    'Myeloma',
    'Non-Hodgkin Lymphoma',
    'Oral Cavity and Pharynx',
    'Ovary',
    'Pancreas',
    'Stomach',
    'Thyroid',
    'Urinary Bladder', //include
];
let selectedFemaleDiseases = [
    'Breast',
    'Colorectal',
    'Kidney',
    'Leukemias',
    'Lung',
    'Melanoma of the Skin',
    'Non-Hodgkin Lymphoma',
    'Oral Cavity and Pharynx',
    'Pancreas',
    'Thyroid',
    'Urinary Bladder', //include
];
let CancerResolver = class CancerResolver {
    async changeSystemInfoAge() {
        let data = await CancerDeath_1.default.find({ Locationabbr: '' });
        for (let i = 0; i < data.length; i++) {
            await CancerDeath_1.default.findOneAndUpdate({
                _id: data[i]._id
            }, {
                Locationabbr: (0, stateAndAbbreviations_1.default)(data[i].Locationdesc)
            });
        }
        return ['done'];
    }
    async getProportionMatrix(year, state, race, age, dataSet) {
        let maleData;
        let femaleData;
        let obj = {};
        if (year) {
            obj.Year = year;
        }
        if (state) {
            obj.State = state;
        }
        if (race) {
            obj.Race = race;
        }
        if (age) {
            obj.ageLabel = age;
        }
        let objMale = {
            ...obj,
            Gender: 'Male',
        };
        let objFemale = {
            ...obj,
            Gender: 'Female',
        };
        if (dataSet === 'Incidence') {
            maleData = await this.getProportionByGender(objMale, true);
            femaleData = await this.getProportionByGender(objFemale, true);
        }
        else {
            maleData = await this.getProportionByGender(objMale, false);
            femaleData = await this.getProportionByGender(objFemale, false);
        }
        return {
            maleData,
            femaleData,
        };
    }
    async getCancerTypes(year, state, race, age, dataSet) {
        let maleData;
        let femaleData;
        let obj = {};
        if (year) {
            obj.Year = year;
        }
        if (state) {
            obj.State = state;
        }
        if (race) {
            obj.Race = race;
        }
        if (age) {
            obj.ageLabel = age;
        }
        let objMale = {
            ...obj,
            Gender: 'Male',
        };
        let objFemale = {
            ...obj,
            Gender: 'Female',
        };
        if (dataSet === 'Incidence') {
            maleData = await this.getCancerTypesByGender(objMale, true, true);
            femaleData = await this.getCancerTypesByGender(objFemale, false, true);
        }
        else {
            maleData = await this.getCancerTypesByGender(objMale, true, false);
            femaleData = await this.getCancerTypesByGender(objFemale, false, false);
        }
        return {
            maleData,
            femaleData,
        };
    }
    async getYearBasedAggregationForCancer(state, race, age, dataSet, maleDisease, femaleDisease) {
        let maleData;
        let femaleData;
        let obj = {};
        if (state) {
            obj.State = state;
        }
        if (race) {
            obj.Race = race;
        }
        if (age) {
            obj.Label = age;
        }
        let objMale = {
            ...obj,
            Gender: 'Male',
        };
        if (maleDisease) {
            objMale.diseaseLabelMale = maleDisease;
        }
        else {
            objMale.diseaseLabelMale = 'Colorectal';
        }
        let objFemale = {
            ...obj,
            Gender: 'Female',
        };
        if (femaleDisease) {
            objFemale.diseaseLabelFemale = femaleDisease;
        }
        else {
            objFemale.diseaseLabelFemale = 'Breast';
        }
        if (dataSet === 'Incidence') {
            maleData = await this.getYearData(objMale, true);
            femaleData = await this.getYearData(objFemale, true);
        }
        else {
            maleData = await this.getYearData(objMale, false);
            femaleData = await this.getYearData(objFemale, false);
        }
        return {
            maleData,
            femaleData,
        };
    }
    async getRaceData(year, state, maleDisease, femaleDisease, age, dataSet) {
        let maleData;
        let femaleData;
        let obj = {};
        if (year) {
            obj.Year = year;
        }
        if (state) {
            obj.State = state;
        }
        if (age) {
            obj.ageLabel = age;
        }
        let objMale = {
            ...obj,
            Gender: 'Male',
        };
        if (maleDisease) {
            objMale.diseaseLabelMale = maleDisease;
        }
        else {
            objMale.diseaseLabelMale = 'Colorectal';
        }
        let objFemale = {
            ...obj,
            Gender: 'Female',
        };
        if (femaleDisease) {
            objFemale.diseaseLabelFemale = femaleDisease;
        }
        else {
            objFemale.diseaseLabelFemale = 'Breast';
        }
        if (dataSet === 'Incidence') {
            maleData = await this.getRaceDataByGender(objMale, true, true);
            femaleData = await this.getRaceDataByGender(objFemale, false, true);
        }
        else {
            maleData = await this.getRaceDataByGender(objMale, true, false);
            femaleData = await this.getRaceDataByGender(objFemale, false, false);
        }
        return {
            maleData,
            femaleData,
        };
    }
    async getAgeData(year, state, maleDisease, femaleDisease, race, dataSet) {
        let maleData;
        let femaleData;
        let obj = {};
        if (year) {
            obj.Year = year;
        }
        if (state) {
            obj.State = state;
        }
        if (race) {
            obj.Race = race;
        }
        let objMale = {
            ...obj,
            Gender: 'Male',
        };
        if (maleDisease) {
            objMale.diseaseLabelMale = maleDisease;
        }
        else {
            objMale.diseaseLabelMale = 'Colorectal';
        }
        let objFemale = {
            ...obj,
            Gender: 'Female',
        };
        if (femaleDisease) {
            objFemale.diseaseLabelFemale = femaleDisease;
        }
        else {
            objFemale.diseaseLabelFemale = 'Breast';
        }
        if (dataSet === 'Incidence') {
            maleData = await this.getAgeDataByGender(objMale, true, true);
            femaleData = await this.getAgeDataByGender(objFemale, false, true);
        }
        else {
            maleData = await this.getAgeDataByGender(objMale, true, false);
            femaleData = await this.getAgeDataByGender(objFemale, false, false);
        }
        return {
            maleData,
            femaleData,
        };
    }
    async getStateDataForCancer(year, race, maleDisease, femaleDisease, age, dataSet) {
        let maleData;
        let femaleData;
        let obj = {};
        if (year) {
            obj.Year = year;
        }
        if (race) {
            obj.Race = race;
        }
        if (age) {
            obj.ageLabel = age;
        }
        let objMale = {
            ...obj,
            Gender: 'Male',
        };
        if (maleDisease) {
            objMale.diseaseLabelMale = maleDisease;
        }
        else {
            objMale.diseaseLabelMale = 'Colorectal';
        }
        let objFemale = {
            ...obj,
            Gender: 'Female',
        };
        if (maleDisease) {
            objFemale.diseaseLabelFemale = femaleDisease;
        }
        else {
            objFemale.diseaseLabelFemale = 'Breast';
        }
        if (dataSet === 'Incidence') {
            maleData = await this.getStateDataByGender(objMale, true, true);
            femaleData = await this.getStateDataByGender(objFemale, false, true);
        }
        else {
            maleData = await this.getStateDataByGender(objMale, true, false);
            femaleData = await this.getStateDataByGender(objFemale, false, false);
        }
        return {
            maleData,
            femaleData,
        };
    }
    async getYearData(obj, isIncident) {
        let model = CancerIncident_1.default;
        if (!isIncident) {
            model = CancerDeath_1.default;
        }
        console.log(model);
        console.log(obj);
        let data = await model.aggregate([
            {
                $match: obj,
            },
            {
                $group: {
                    _id: '$Year',
                    totalPopulation: { $sum: '$PopulationInNumber' },
                    totalCount: { $sum: '$CountInNumber' },
                    totalCrudeRate: { $sum: '$CrudeRateInNumber' },
                    numerator: {
                        $sum: {
                            $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: '$_id',
                    totalPopulation: '$totalPopulation',
                    totalCount: '$totalCount',
                    totalCrudeRate: '$totalCrudeRate',
                    weightedAverage: {
                        $divide: ['$numerator', '$totalPopulation'],
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        if (data.length === 0) {
            return [];
        }
        let total = data.reduce((acc, d) => {
            acc += d.totalCount;
            return acc;
        }, 0);
        for (let i = 0; i < data.length; i++) {
            let percentage = (100 * data[i].totalCount) / total;
            data[i].percentage = percentage;
        }
        return data;
    }
    async getAgeDataByGender(obj, male, isIncident) {
        let model = CancerIncident_1.default;
        if (!isIncident) {
            model = CancerDeath_1.default;
        }
        let data = await model.aggregate([
            {
                $match: obj,
            },
            {
                $unwind: '$ageLabel',
            },
            {
                $group: {
                    _id: '$ageLabel',
                    totalPopulation: { $sum: '$PopulationInNumber' },
                    totalCount: { $sum: '$CountInNumber' },
                    totalCrudeRate: { $sum: '$CrudeRateInNumber' },
                    numerator: {
                        $sum: {
                            $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: '$_id',
                    totalPopulation: '$totalPopulation',
                    totalCount: '$totalCount',
                    totalCrudeRate: '$totalCrudeRate',
                    weightedAverage: { $divide: ['$numerator', '$totalPopulation'] },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        if (data.length === 0) {
            return [];
        }
        let total = data.reduce((acc, d) => {
            acc += d.totalCount;
            return acc;
        }, 0);
        for (let i = 0; i < data.length; i++) {
            let percentage = (100 * data[i].totalCount) / total;
            data[i].percentage = percentage;
        }
        return data;
    }
    async getStateDataByGender(obj, isMale, isIncident) {
        let model = CancerIncident_1.default;
        if (!isIncident) {
            model = CancerDeath_1.default;
        }
        console.log(obj);
        let data = await model.aggregate([
            {
                $match: obj,
            },
            {
                $unwind: '$Locationabbr',
            },
            {
                $group: {
                    _id: '$Locationabbr',
                    fullForm: { $first: '$Locationdesc' },
                    totalPopulation: { $sum: '$PopulationInNumber' },
                    totalCount: { $sum: '$CountInNumber' },
                    totalCrudeRate: { $sum: '$CrudeRateInNumber' },
                    numerator: {
                        $sum: {
                            $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: '$_id',
                    fullForm: '$fullForm',
                    totalPopulation: '$totalPopulation',
                    totalCount: '$totalCount',
                    totalCrudeRate: '$totalCrudeRate',
                    weightedAverage: { $divide: ['$numerator', '$totalPopulation'] },
                },
            },
            {
                $sort: {
                    sort: 1,
                },
            },
        ]);
        let total = data.reduce((acc, d) => {
            acc += d.totalCount;
            return acc;
        }, 0);
        for (let i = 0; i < data.length; i++) {
            let percentage = (100 * data[i].totalCount) / total;
            data[i].percentage = percentage;
        }
        if (data.length === 0) {
            return JSON.stringify({});
        }
        let forMatedData = data;
        let returnObj = {};
        let sortedArray = forMatedData.sort((data1, data2) => data1.percentage - data2.percentage);
        let length = sortedArray.length;
        let t25 = Math.floor((25 / 100) * (length + 1));
        let t50 = Math.floor((50 / 100) * (length + 1));
        let t75 = Math.floor((75 / 100) * (length + 1));
        let lowest = sortedArray[0];
        let highest = sortedArray[sortedArray.length - 1];
        for (let i = 0; i < sortedArray.length; i++) {
            returnObj[sortedArray[i]._id] = sortedArray[i];
            if (sortedArray[t75].percentage < sortedArray[i].percentage) {
                returnObj[sortedArray[i]._id].quartile = 4;
            }
            else if (sortedArray[t50].percentage < sortedArray[i].percentage &&
                sortedArray[t75].percentage <= sortedArray[i].percentage) {
                returnObj[sortedArray[i]._id].quartile = 3;
            }
            else if (sortedArray[t25].percentage < sortedArray[i].percentage &&
                sortedArray[t50].percentage <= sortedArray[i].percentage) {
                returnObj[sortedArray[i]._id].quartile = 2;
            }
            else {
                returnObj[sortedArray[i]._id].quartile = 1;
            }
        }
        let returnData = {
            quartile: {
                0: lowest.percentage,
                25: sortedArray[t25].percentage,
                50: sortedArray[t50].percentage,
                75: sortedArray[t75].percentage,
                100: highest.percentage,
            },
            data: returnObj,
        };
        return JSON.stringify(returnData);
    }
    async getRaceDataByGender(obj, male, isIncident) {
        let model = CancerIncident_1.default;
        if (!isIncident) {
            model = CancerDeath_1.default;
            console.log(obj);
        }
        let data = await model.aggregate([
            {
                $match: obj,
            },
            {
                $unwind: '$Race',
            },
            {
                $group: {
                    _id: '$Race',
                    totalPopulation: { $sum: '$PopulationInNumber' },
                    totalCount: { $sum: '$CountInNumber' },
                    totalCrudeRate: { $sum: '$CrudeRateInNumber' },
                    numerator: {
                        $sum: {
                            $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: '$_id',
                    totalPopulation: '$totalPopulation',
                    totalCount: '$totalCount',
                    totalCrudeRate: '$totalCrudeRate',
                    weightedAverage: { $divide: ['$numerator', '$totalPopulation'] },
                },
            },
            {
                $sort: {
                    sort: 1,
                },
            },
        ]);
        if (data.length === 0) {
            return [];
        }
        let total = data.reduce((acc, d) => {
            acc += d.totalCount;
            return acc;
        }, 0);
        for (let i = 0; i < data.length; i++) {
            let percentage = (100 * data[i].totalCount) / total;
            data[i].percentage = percentage;
        }
        return data;
    }
    async getProportionByGender(obj, isIncident) {
        let model = CancerIncident_1.default;
        if (!isIncident) {
            model = CancerDeath_1.default;
        }
        let unwindValue = '';
        if (obj.Gender === 'Male') {
            unwindValue = '$diseaseLabelMale';
        }
        else {
            unwindValue = '$diseaseLabelFemale';
        }
        let maleData = await model.aggregate([
            {
                $match: obj,
            },
            {
                $unwind: unwindValue,
            },
            {
                $group: {
                    _id: unwindValue,
                    totalPopulation: { $sum: '$PopulationInNumber' },
                    totalCount: { $sum: '$CountInNumber' },
                    totalCrudeRate: { $sum: '$CrudeRateInNumber' },
                    numerator: {
                        $sum: {
                            $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: '$_id',
                    totalPopulation: '$totalPopulation',
                    totalCount: '$totalCount',
                    totalCrudeRate: '$totalCrudeRate',
                    weightedAverage: { $divide: ['$numerator', '$totalPopulation'] },
                },
            },
        ]);
        if (maleData.length === 0) {
            return [];
        }
        let maleTotal = maleData.reduce((acc, d) => {
            acc += d.totalCount;
            return acc;
        }, 0);
        for (let i = 0; i < maleData.length; i++) {
            let percentage = (100 * maleData[i].totalCount) / maleTotal;
            maleData[i].percentage = percentage;
        }
        return maleData;
    }
    async getCancerTypesByGender(obj, male, isIncident) {
        let model = CancerIncident_1.default;
        if (!isIncident) {
            model = CancerDeath_1.default;
        }
        let unwindValue = '';
        if (obj.Gender === 'Male') {
            unwindValue = '$diseaseLabelMale';
        }
        else {
            unwindValue = '$diseaseLabelFemale';
        }
        let data = await model.aggregate([
            {
                $match: obj,
            },
            {
                $unwind: '$Topic',
            },
            {
                $group: {
                    _id: '$Topic',
                    totalPopulation: { $sum: '$PopulationInNumber' },
                    totalCount: { $sum: '$CountInNumber' },
                    totalCrudeRate: { $sum: '$CrudeRateInNumber' },
                    numerator: {
                        $sum: {
                            $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: '$_id',
                    totalPopulation: '$totalPopulation',
                    totalCount: '$totalCount',
                    totalCrudeRate: '$totalCrudeRate',
                    weightedAverage: { $divide: ['$numerator', '$totalPopulation'] },
                },
            },
            {
                $sort: {
                    weightedAverage: -1,
                },
            },
        ]);
        if (data.length === 0) {
            return [];
        }
        let total = data.reduce((acc, d) => {
            acc += d.totalCount;
            return acc;
        }, 0);
        let maleDisease = [];
        let femaleDisease = [];
        if (isIncident) {
            maleDisease = [
                'Colorectal',
                'Kidney',
                'Leukemias',
                'Lung',
                'Melanoma of the Skin',
                'Non-Hodgkin Lymphoma',
                'Oral Cavity and Pharynx',
                'Pancreas',
                'Prostate',
                'Urinary Bladder', //include
            ];
            femaleDisease = [
                'Breast',
                'Colorectal',
                'Kidney',
                'Leukemias',
                'Lung',
                'Melanoma of the Skin',
                'Non-Hodgkin Lymphoma',
                'Oral Cavity and Pharynx',
                'Pancreas',
                'Thyroid',
                'Urinary Bladder', //include
            ];
        }
        else {
            maleDisease = [
                'Bladder',
                'Brain',
                'Colorectal',
                'Esophagus',
                'Leukemias',
                'Liver',
                'Lung',
                'Lymphoma',
                'Pancreas',
                'Prostate', // include
            ];
            femaleDisease = [
                'Brain',
                'Breast',
                'Cervix',
                'Colorectal',
                'Leukemias',
                'Liver',
                'Lung',
                'Lymphoma',
                'Ovary',
                'Pancreas', // include
            ];
        }
        for (let i = 0; i < data.length; i++) {
            if (male) {
                if (!maleDisease.includes(data[i]._id)) {
                    data.splice(i, 1);
                    i--;
                    continue;
                }
            }
            else {
                if (!femaleDisease.includes(data[i]._id)) {
                    data.splice(i, 1);
                    i--;
                    continue;
                }
            }
            let percentage = (100 * data[i].totalCount) / total;
            data[i].percentage = percentage;
        }
        data = data.sort((a, b) => a.percentage - b.percentage);
        return data;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [String]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CancerResolver.prototype, "changeSystemInfoAge", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGender_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('age', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], CancerResolver.prototype, "getProportionMatrix", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGender_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('age', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], CancerResolver.prototype, "getCancerTypes", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGender_1.default),
    __param(0, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('age', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('maleDisease', { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('femaleDisease', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], CancerResolver.prototype, "getYearBasedAggregationForCancer", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGender_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('maleDisease', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('femaleDisease', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('age', { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], CancerResolver.prototype, "getRaceData", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGender_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('maleDisease', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('femaleDisease', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], CancerResolver.prototype, "getAgeData", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGenderString_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('maleDisease', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('femaleDisease', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('age', { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], CancerResolver.prototype, "getStateDataForCancer", null);
CancerResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CancerResolver);
exports.default = CancerResolver;
