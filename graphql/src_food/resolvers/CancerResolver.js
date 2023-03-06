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
];
let femaleDisease = [
    'Breast',
    'Cervix Uteri',
    'Colorectal',
    'Kidney',
    'Liver',
    'Lung',
    'Ovary',
    'Pancreas',
    'Stomach',
    'Thyroid', //done
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
    async getProportionMatrix(year, state, race, age, dataSet) {
        if (dataSet === 'incidence') {
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
                obj.ageGroup = age;
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
        if (dataSet === 'incidence') {
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
                obj.ageGroup = age;
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
    async getRaceData(year, state, disease, age, dataSet) {
        if (dataSet === 'incidence') {
            let obj = {};
            if (disease) {
                obj.Topic = disease;
            }
            else {
                obj.Topic = 'Brain';
            }
            if (year) {
                obj.Year = year;
            }
            if (state) {
                obj.State = state;
            }
            if (age) {
                obj.ageGroup = age;
            }
            let objMale = {
                ...obj,
                Gender: 'Male',
            };
            let objFemale = {
                ...obj,
                Gender: 'Female',
            };
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
    async getStateDataForCancer(year, disease, race, age, dataSet) {
        if (dataSet === 'incidence') {
            console.log(dataSet);
            let obj = {};
            if (disease) {
                obj.Topic = disease;
            }
            else {
                obj.Topic = 'Brain';
            }
            if (year) {
                obj.Year = year;
            }
            if (race) {
                obj.race = race;
            }
            if (age) {
                obj.ageGroup = age;
            }
            let objMale = {
                ...obj,
                Gender: 'Male',
            };
            let objFemale = {
                ...obj,
                Gender: 'Female',
            };
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
    async getStateDataByGender(obj, male) {
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
        let total = data.reduce((acc, d) => {
            acc += d.totalCount;
            return acc;
        }, 0);
        for (let i = 0; i < data.length; i++) {
            let percentage = (100 * data[i].totalCount) / total;
            data[i].percentage = percentage;
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
        return data;
    }
    async getProportionByGender(obj) {
        let maleData = await CancerIncident_1.default.aggregate([
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
        let maleTotal = maleData.reduce((acc, d) => {
            acc += d.totalCount;
            return acc;
        }, 0);
        if (maleData.length > 10) {
            let maleOther = maleData.slice(9);
            let otherMaleDisEases = maleOther.map((maleD) => maleD._id);
            obj.Topic = { $in: otherMaleDisEases };
            let otherData = await CancerIncident_1.default.aggregate([
                {
                    $match: obj,
                },
                {
                    $unwind: '$Gender',
                },
                {
                    $group: {
                        _id: '$Gender',
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
                        _id: 'Other',
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
            maleData.splice(9, otherMaleDisEases.length);
            maleData.push(otherData[0]);
        }
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
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('disease', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('age', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], CancerResolver.prototype, "getRaceData", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProportionGenderString_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('disease', { nullable: true })),
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
], CancerResolver.prototype, "getStateDataForCancer", null);
CancerResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CancerResolver);
exports.default = CancerResolver;
