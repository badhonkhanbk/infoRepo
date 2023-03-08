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
const ProportionGender_1 = __importDefault(require("../schemas/ProportionGender"));
const ProportionGenderString_1 = __importDefault(require("../schemas/ProportionGenderString"));
let race = [
    'American Indian or Alaska Native',
    'Asian or Pacific Islander',
    'Black or African American',
    'Hispanic',
    'Other Races and Unknown combined',
    'White',
];
let maleDisease = [
    'Colorectal',
    'Esophagus',
    'Gallbladder',
    'Kidney',
    'Liver',
    'Lung',
    'Pancreas',
    'Prostate',
    'Stomach',
    'Thyroid',
    'Other',
];
let femaleDisease = [
    'Breast',
    'Cervix',
    'Colorectal',
    'Kidney',
    'Liver',
    'Lung',
    'Ovary',
    'Pancreas',
    'Stomach',
    'Thyroid',
    'Other',
];
let age = [
    '01-04',
    '05-09',
    '1-4',
    '10-14',
    '15-19',
    '20-24',
    '25-29',
    '30-34',
    '35-39',
    '40-44',
    '45-49',
    '50-54',
    '55-59',
    '60-64',
    '65-69',
    '70-74',
    '75-79',
    '80-84',
    '85+',
];
let CancerResolver = class CancerResolver {
    async changeSystemInfoAge() {
        await CancerIncident_1.default.updateMany({
            Gender: 'Female',
            Topic: 'Cervix',
        }, {
            diseaseLabelFemale: 'Cervix',
        });
        return ['done'];
    }
    async getProportionMatrix(year, state, race, age, dataSet) {
        if (dataSet === 'Incidence') {
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
            let maleData = await this.getProportionByGender(objMale);
            let femaleData = await this.getProportionByGender(objFemale);
            return {
                maleData,
                femaleData,
            };
        }
        else {
            throw new Error('Unknown data set');
        }
    }
    async getCancerTypes(year, state, race, age, dataSet) {
        if (dataSet === 'Incidence') {
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
            let maleData = await this.getCancerTypesByGender(objMale, true);
            let femaleData = await this.getCancerTypesByGender(objFemale, false);
            return {
                maleData,
                femaleData,
            };
        }
        else {
            throw new Error('Unknown data set');
        }
    }
    async getYearBasedAggregationForCancer(state, race, age, dataSet, maleDisease, femaleDisease) {
        if (dataSet === 'Incidence') {
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
            let maleData = await this.getYearData(objMale);
            let femaleData = await this.getYearData(objFemale);
            return {
                maleData,
                femaleData,
            };
        }
        else {
            throw new Error('Unknown data set');
        }
    }
    async getRaceData(year, state, maleDisease, femaleDisease, age, dataSet) {
        if (dataSet === 'Incidence') {
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
            let maleData = await this.getRaceDataByGender(objMale, true);
            let femaleData = await this.getRaceDataByGender(objFemale, false);
            return {
                maleData,
                femaleData,
            };
        }
        else {
            throw new Error('Unknown data set');
        }
    }
    async getAgeData(year, state, maleDisease, femaleDisease, race, dataSet) {
        if (dataSet === 'Incidence') {
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
            let maleData = await this.getAgeDataByGender(objMale, true);
            let femaleData = await this.getAgeDataByGender(objFemale, false);
            return {
                maleData,
                femaleData,
            };
        }
        else {
            throw new Error('Unknown data set');
        }
    }
    async getStateDataForCancer(year, race, maleDisease, femaleDisease, age, dataSet) {
        if (dataSet === 'Incidence') {
            console.log(dataSet);
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
            let maleData = await this.getStateDataByGender(objMale, true);
            let femaleData = await this.getStateDataByGender(objFemale, false);
            return {
                maleData,
                femaleData,
            };
        }
        else {
            throw new Error('Unknown data set');
        }
    }
    async getYearData(obj) {
        console.log(obj);
        let data = await CancerIncident_1.default.aggregate([
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
    async getAgeDataByGender(obj, male) {
        // obj._id = { $nin: ['01-04', '05-09', '1-4', '10-14', '15-19'] };
        let data = await CancerIncident_1.default.aggregate([
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
    async getStateDataByGender(obj, isMale) {
        console.log(obj);
        let data = await CancerIncident_1.default.aggregate([
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
        console.log(data);
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
    async getRaceDataByGender(obj, male) {
        let data = await CancerIncident_1.default.aggregate([
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
    async getCancerTypesByGender(obj, male) {
        let data = await CancerIncident_1.default.aggregate([
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
        let maleDisease = [
            'Colorectal',
            'Esophagus',
            'Gallbladder',
            'Kidney',
            'Liver',
            'Lung',
            'Pancreas',
            'Prostate',
            'Stomach',
            'Thyroid',
        ];
        let femaleDisease = [
            'Breast',
            'Cervix',
            'Colorectal',
            'Kidney',
            'Liver',
            'Lung',
            'Ovary',
            'Pancreas',
            'Stomach',
            'Thyroid',
        ];
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
    async getProportionByGender(obj) {
        let unwindValue = '';
        if (obj.Gender === 'Male') {
            unwindValue = '$diseaseLabelMale';
        }
        else {
            unwindValue = '$diseaseLabelFemale';
        }
        let maleData = await CancerIncident_1.default.aggregate([
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
