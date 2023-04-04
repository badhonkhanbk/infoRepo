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
const allcancer_1 = __importDefault(require("../../../models/allcancer"));
const ProportionGender_1 = __importDefault(require("../schemas/ProportionGender"));
const ProportionGenderString_1 = __importDefault(require("../schemas/ProportionGenderString"));
let ALLYEAR = [
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    // '2015-2019',
    '2016',
    '2017',
    '2018',
    '2019',
];
let allState = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'United States (comparable to ICD-O-2)',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
];
let selectedFemaleDiseases1 = [
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
    'Urinary Bladder', //include Cervix
];
let maleDiseases = [
    'All Cancer',
    'Bladder',
    'Brain',
    'Colorectal',
    'Esophagus',
    'H Lymphoma',
    'Kaposi Sarcoma',
    'Kidney',
    'Larynx',
    'Leukemia',
    'Liver',
    'Lung',
    'Mesothelioma',
    'Mouth & Throat',
    'Myeloma',
    'NH Lymphoma',
    'Pancreas',
    'Prostate',
    'Skin',
    'Stomach',
    'Testis',
    'Thyroid',
];
let femaleDisease1 = [
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
let femaleDisease = [
    'All Cancer',
    'Bladder',
    'Brain',
    'Cervix',
    'Colorectal',
    'Corpus and Uterus, NOS',
    'Esophagus',
    'Female Breast',
    'Female Breast, in situ',
    'H Lymphoma',
    'Kaposi Sarcoma',
    'Kidney',
    'Larynx',
    'Leukemia',
    'Liver',
    'Lung',
    'Mesothelioma',
    'Mouth & Throat',
    'Myeloma',
    'NH Lymphoma',
    'Ovary',
    'Pancreas',
    'Skin',
    'Stomach',
    'Thyroid',
];
let race = ['All Races', 'Asian', 'Black', 'Hispanic', 'Other', 'White'];
let AllCancerResolver = class AllCancerResolver {
    async getallCancerProportionMatrix(year, state, race, dataSet) {
        let maleData;
        let femaleData;
        let obj = {};
        if (year) {
            obj.Year = year;
        }
        if (state) {
            obj.Locationabbr = state;
        }
        else {
            if (dataSet === 'Incidence') {
                obj.Locationabbr = 'United States';
            }
        }
        if (race) {
            obj.Race = race;
        }
        else {
            obj.Race = 'All Races';
        }
        let objMale = {
            ...obj,
            Gender: 'Male',
        };
        let objFemale = {
            ...obj,
            Gender: 'Female',
        };
        // console.log(objMale);
        // console.log(objFemale);
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
    async getAllCancerTypes(year, state, race, dataSet) {
        let maleData;
        let femaleData;
        let obj = {};
        if (year) {
            obj.Year = year;
        }
        if (state) {
            obj.Locationabbr = state;
        }
        // else {
        //   if (dataSet === 'Incidence') {
        //     obj.Locationabbr = 'United States';
        //   }
        // }
        if (race) {
            obj.Race = race;
        }
        else {
            obj.Race = 'All Races';
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
    async getAllCancerRaceData(year, state, maleDisease, femaleDisease, dataSet) {
        let maleData;
        let femaleData;
        let obj = {};
        if (year) {
            obj.Year = year;
        }
        if (state) {
            obj.Locationabbr = state;
        }
        // else {
        //   if (dataSet === 'Incidence') {
        //     obj.Locationabbr = 'United States';
        //   }
        // }
        // if (age) {
        //   obj.ageLabel = age;
        // }
        let objMale = {
            ...obj,
            Gender: 'Male',
        };
        if (maleDisease) {
            objMale.diseaseLabelMale = maleDisease;
        }
        else {
            objMale.diseaseLabelMale = 'All Cancer';
        }
        let objFemale = {
            ...obj,
            Gender: 'Female',
        };
        if (femaleDisease) {
            objFemale.diseaseLabelFemale = femaleDisease;
        }
        else {
            objFemale.diseaseLabelFemale = 'All Cancer';
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
    async getYearBasedAggregationForAllCancer(state, race, dataSet, maleDisease, femaleDisease) {
        let maleData;
        let femaleData;
        let obj = {};
        if (state) {
            obj.Locationabbr = state;
        }
        // else {
        //   if (dataSet === 'Incidence') {
        //     if (dataSet === 'Incidence') {
        //       obj.Locationabbr = 'United States';
        //     }
        //   }
        // }
        if (race) {
            obj.Race = race;
        }
        else {
            obj.Race = 'All Races';
        }
        let objMale = {
            ...obj,
            Gender: 'Male',
        };
        if (maleDisease) {
            objMale.diseaseLabelMale = maleDisease;
        }
        else {
            objMale.diseaseLabelMale = 'All Cancer';
        }
        let objFemale = {
            ...obj,
            Gender: 'Female',
        };
        if (femaleDisease) {
            objFemale.diseaseLabelFemale = femaleDisease;
        }
        else {
            objFemale.diseaseLabelFemale = 'All Cancer';
        }
        // console.log(objMale);
        // console.log(objFemale);
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
    async getStateDataForAllCancer(year, race, maleDisease, femaleDisease, dataSet) {
        let maleData;
        let femaleData;
        let obj = {};
        if (year) {
            obj.Year = year;
        }
        if (race) {
            obj.Race = race;
        }
        else {
            obj.Race = 'All Races';
        }
        // if (age) {
        //   obj.ageLabel = age;
        // }
        let objMale = {
            ...obj,
            Gender: 'Male',
        };
        if (maleDisease) {
            objMale.diseaseLabelMale = maleDisease;
        }
        else {
            objMale.diseaseLabelMale = 'All Cancer';
        }
        let objFemale = {
            ...obj,
            Gender: 'Female',
        };
        if (maleDisease) {
            objFemale.diseaseLabelFemale = femaleDisease;
        }
        else {
            objFemale.diseaseLabelFemale = 'All Cancer';
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
    async getStateDataByGender(obj, isMale, isIncident) {
        obj.type = 'Incidence';
        obj.Locationabbr = { $ne: 'United States' };
        if (!isIncident) {
            obj.type = 'Death';
        }
        let data = await allcancer_1.default.aggregate([
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
        if (data.length === 0 || data.length < 5) {
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
        for (let i = 1; i < sortedArray.length - 1; i++) {
            returnObj[sortedArray[i]._id] = sortedArray[i];
            if (sortedArray[t75].weightedAverage < sortedArray[i].weightedAverage) {
                returnObj[sortedArray[i]._id].quartile = 4;
            }
            else if (sortedArray[t50].weightedAverage < sortedArray[i].weightedAverage &&
                sortedArray[t75].weightedAverage <= sortedArray[i].weightedAverage) {
                returnObj[sortedArray[i]._id].quartile = 3;
            }
            else if (sortedArray[t25].weightedAverage < sortedArray[i].weightedAverage &&
                sortedArray[t50].weightedAverage <= sortedArray[i].weightedAverage) {
                returnObj[sortedArray[i]._id].quartile = 2;
            }
            else {
                returnObj[sortedArray[i]._id].quartile = 1;
            }
        }
        let returnData = {
            quartile: {
                0: lowest.weightedAverage,
                25: sortedArray[t25].weightedAverage,
                50: sortedArray[t50].weightedAverage,
                75: sortedArray[t75].weightedAverage,
                100: highest.weightedAverage,
            },
            data: returnObj,
        };
        // console.log(Object.keys(returnData.data));
        console.log(returnData.data.AL);
        return JSON.stringify(returnData);
    }
    async getYearData(obj, isIncident) {
        obj.type = 'Incidence';
        obj.Year = { $ne: '2015-2019' };
        if (!isIncident) {
            obj.type = 'Death';
        }
        // console.log(obj);
        let data = await allcancer_1.default.aggregate([
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
        // console.log(data);
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
    async getRaceDataByGender(obj, male, isIncident) {
        obj.type = 'Incidence';
        obj.Race = { $ne: 'All Races' };
        if (!isIncident) {
            obj.type = 'Death';
        }
        let data = await allcancer_1.default.aggregate([
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
    async getCancerTypesByGender(obj, male, isIncident) {
        obj.type = 'Incidence';
        obj.Topic = { $ne: 'All Cancer' };
        if (!isIncident) {
            obj.type = 'Death';
        }
        let unwindValue = '';
        if (obj.Gender === 'Male') {
            unwindValue = '$diseaseLabelMale';
        }
        else {
            unwindValue = '$diseaseLabelFemale';
        }
        let data = await allcancer_1.default.aggregate([
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
                'Skin',
                'Lymphoma',
                'Oral',
                'Pancreas',
                'Prostate',
                'Bladder',
            ];
            femaleDisease = [
                'Breast',
                'Colorectal',
                'Kidney',
                'Leukemias',
                'Lung',
                'Skin',
                'Lymphoma',
                'Pancreas',
                'Thyroid',
                'Cervix',
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
                'Prostate',
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
                'Pancreas',
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
    async tuttrus() {
        await allcancer_1.default.updateMany({
            diseaseLabelMale: 'Leukemias',
            Gender: 'Male',
        }, {
            Topic: 'Leukemias',
        });
        await allcancer_1.default.updateMany({
            diseaseLabelFemale: 'Leukemias',
            Gender: 'Female',
        }, {
            Topic: 'Leukemias',
        });
        await allcancer_1.default.updateMany({
            diseaseLabelMale: 'Lymphoma',
            Gender: 'Male',
        }, {
            Topic: 'Lymphoma',
        });
        await allcancer_1.default.updateMany({
            diseaseLabelFemale: 'Lymphoma',
            Gender: 'Female',
        }, {
            Topic: 'Lymphoma',
        });
        await allcancer_1.default.updateMany({
            diseaseLabelMale: 'Oral',
            Gender: 'Male',
        }, {
            Topic: 'Oral',
        });
        await allcancer_1.default.updateMany({
            Gender: 'Female',
            diseaseLabelFemale: 'Oral',
        }, {
            Topic: 'Oral',
        });
        await allcancer_1.default.updateMany({
            diseaseLabelFemale: 'Breast',
            Gender: 'Female',
        }, {
            Topic: 'Breast',
        });
        return 'Done';
    }
    async getProportionByGender(obj, isIncident) {
        obj.type = 'Incidence';
        obj.Topic = 'All Cancer';
        if (!isIncident) {
            obj.type = 'Death';
        }
        let unwindValue = '';
        if (obj.Gender === 'Male') {
            unwindValue = '$diseaseLabelMale';
        }
        else {
            unwindValue = '$diseaseLabelFemale';
        }
        let maleData = await allcancer_1.default.aggregate([
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
};
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGender_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AllCancerResolver.prototype, "getallCancerProportionMatrix", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGender_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AllCancerResolver.prototype, "getAllCancerTypes", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGender_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('maleDisease', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('femaleDisease', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AllCancerResolver.prototype, "getAllCancerRaceData", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGender_1.default),
    __param(0, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('maleDisease', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('femaleDisease', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AllCancerResolver.prototype, "getYearBasedAggregationForAllCancer", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGenderString_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('maleDisease', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('femaleDisease', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AllCancerResolver.prototype, "getStateDataForAllCancer", null);
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AllCancerResolver.prototype, "tuttrus", null);
AllCancerResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AllCancerResolver);
exports.default = AllCancerResolver;
