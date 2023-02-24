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
const infoGraphic_1 = __importDefault(require("../../../models/infoGraphic"));
const Overall_1 = __importDefault(require("../../../models/Overall"));
const fs_1 = __importDefault(require("fs"));
const FotmatedData_1 = __importDefault(require("../schemas/FotmatedData"));
const ReturnInfoData_1 = __importDefault(require("../schemas/ReturnInfoData"));
const class_1 = __importDefault(require("../../../models/class"));
const myClass_1 = __importDefault(require("../schemas/myClass"));
const Compare_1 = __importDefault(require("../schemas/Compare"));
const infoGraphicDeath_1 = __importDefault(require("../../../models/infoGraphicDeath"));
//https://blending101-infographic.vercel.app/
let FoodResolver = class FoodResolver {
    // @Query(() => String)
    // async csvConverter() {
    //   const csvFilePath = './temp/info.csv';
    //   const jsonArray = await csv().fromFile(csvFilePath);
    //   fs.writeFileSync('./temp/infoData.json', JSON.stringify(jsonArray));
    //   return 'done';
    // }
    async modifyData() {
        let allData = await infoGraphic_1.default.find().skip(50000);
        for (let i = 0; i < allData.length; i++) {
            let sampleSizeInNumber;
            let dataValueInNumber;
            let actualDataValueInNumber;
            if (allData[i].Data_value === '') {
                sampleSizeInNumber = Number(allData[i].Sample_Size);
                dataValueInNumber = 0;
                actualDataValueInNumber = 0;
            }
            else if (allData[i].Sample_Size === '0') {
                if (allData[i].Data_value === '') {
                    sampleSizeInNumber = 0;
                    dataValueInNumber = 0;
                    actualDataValueInNumber = 0;
                }
                else {
                    sampleSizeInNumber = 0;
                    dataValueInNumber = 0;
                    actualDataValueInNumber = 0;
                }
            }
            else {
                sampleSizeInNumber = Number(allData[i].Sample_Size);
                dataValueInNumber = Number(allData[i].Data_value);
                actualDataValueInNumber =
                    (dataValueInNumber / 100) * sampleSizeInNumber;
            }
            await infoGraphic_1.default.findByIdAndUpdate(allData[i]._id, {
                Actual_Data_Value_Number: actualDataValueInNumber,
            });
            console.log(i);
        }
        return 'done';
    }
    // @Query(() => String)
    // async modifyData2() {
    //   let allData = await InfoGraphic.find();
    //   for (let i = 0; i < allData.length; i++) {
    //     let sampleSizeInNumber;
    //     let dataValueInNumber;
    //     let actualDataValueInNumber;
    //     let Category;
    //     if (allData[i].Data_value === '') {
    //       sampleSizeInNumber = Number(allData[i].Sample_Size);
    //       dataValueInNumber = 0;
    //       actualDataValueInNumber = 0;
    //     } else if (allData[i].Sample_Size === '0') {
    //       if (allData[i].Data_value === '') {
    //         sampleSizeInNumber = 0;
    //         dataValueInNumber = 0;
    //         actualDataValueInNumber = 0;
    //       } else {
    //         sampleSizeInNumber = 0;
    //         dataValueInNumber = 0;
    //         actualDataValueInNumber = 0;
    //       }
    //     } else {
    //       sampleSizeInNumber = Number(allData[i].Sample_Size);
    //       dataValueInNumber = Number(allData[i].Data_value);
    //       actualDataValueInNumber =
    //         (100 / dataValueInNumber) * sampleSizeInNumber;
    //     }
    //     if (allData[i].Break_Out_Category === 'Race/Ethnicity') {
    //       if (
    //         allData[i].Break_Out ===
    //           'Native Hawaiian or other Pacific Islander, non-Hispanic' ||
    //         allData[i].Break_Out ===
    //           'American Indian or Alaskan Native, non-Hispanic' ||
    //         allData[i].Break_Out === 'Multiracial, non-Hispanic' ||
    //         allData[i].Break_Out === 'Other, non-Hispanic'
    //       ) {
    //         Category = 'Other';
    //       } else if (allData[i].Break_Out === 'Hispanic') {
    //         Category = 'Hispanic';
    //       } else if (allData[i].Break_Out === 'White, non-Hispanic') {
    //         Category = 'White';
    //       } else if (allData[i].Break_Out === 'Black, non-Hispanic') {
    //         Category = 'Black';
    //       } else if (allData[i].Break_Out === 'Asian, non-Hispanic') {
    //         Category = 'Asian';
    //       }
    //     } else {
    //       Category = allData[i].Break_Out;
    //     }
    //     await InfoGraphic.findByIdAndUpdate(allData[i]._id, {
    //       Sample_Size_Number: sampleSizeInNumber,
    //       Data_value_Number: dataValueInNumber,
    //       Actual_Data_Value_Number: actualDataValueInNumber,
    //       Category,
    //     });
    //     if (i % 1000 === 0) {
    //       console.log(i);
    //     }
    //   }
    //   return 'done';
    // }
    async modifyDataOverall() {
        await Overall_1.default.deleteMany({});
        let allData = await infoGraphic_1.default.find({
            Break_Out_Category: 'Overall',
        });
        console.log(allData.length);
        for (let i = 0; i < allData.length; i++) {
            let data = {
                Year: allData[i].Year,
                Locationabbr: allData[i].Locationabbr,
                Locationdesc: allData[i].Locationdesc,
                Class: allData[i].Class,
                Topic: allData[i].Topic,
                Break_Out: allData[i].Break_Out,
                Break_Out_Category: allData[i].Break_Out_Category,
                Category: allData[i].Category,
                Sample_Size: allData[i].Sample_Size,
                Sample_Size_Number: allData[i].Sample_Size_Number,
                Data_value: allData[i].Data_value,
                Data_value_Number: allData[i].Data_value_Number,
                Actual_Data_Value_Number: allData[i].Actual_Data_Value_Number,
                Confidence_limit_Low: allData[i].Confidence_limit_Low,
                Confidence_limit_High: allData[i].Confidence_limit_High,
                Data_value_unit: allData[i].Data_value_unit,
            };
            await Overall_1.default.create(data);
            console.log(i);
        }
        return 'done';
    }
    async storeData() {
        const data = JSON.parse(fs_1.default.readFileSync('./temp/infoData2.json', 'utf-8'));
        for (let i = 0; i < data.length; i++) {
            await infoGraphic_1.default.create({
                Condition: data[i].Condition,
                ICD_Sub_Chapter_Code: data[i]['ICD Sub-Chapter Code'],
                State: data[i].State,
                State_Code: data[i]['State Code'],
                Year: data[i].Year,
                Year_Code: data[i]['Year Code'],
                Ten_Year_Age_Groups: data[i]['Ten-Year Age Groups'],
                Ten_Year_Age_Groups_Code: data[i]['Ten-Year Age Groups Code'],
                Gender: data[i].Gender,
                Race: data[i].Race,
                Race_Code: data[i]['Race Code'],
                Deaths: data[i].Deaths,
                Population: data[i].Population,
                Crude_Rate: data[i]['Crude Rate'],
                Crude_Rate_Lower_95percent_Confidence_Interval: data[i]['Crude Rate Lower 95% Confidence Interval'],
                Crude_Rate_Upper_95percent_Confidence_Interval: data[i]['Crude Rate Upper 95% Confidence Interval'],
                Percentage_of_Total_Deaths: data[i]['% of Total Deaths'],
            });
            console.log(i);
        }
        return 'done';
    }
    async showInfoData(year, state, disease, race, age, sex, dataSet) {
        if (dataSet === 'incidence' || !dataSet) {
            let obj = {};
            if (year) {
                obj.Year = year;
            }
            else {
                obj.Year = '2021';
            }
            if (state) {
                obj.Locationabbr = state;
            }
            let diseaseObj = {
                ...obj,
            };
            if (race) {
                diseaseObj.Category = race;
            }
            if (age) {
                diseaseObj.Category = age;
            }
            if (sex) {
                diseaseObj.Category = sex;
            }
            let model;
            if (diseaseObj.Category) {
                model = infoGraphic_1.default;
            }
            else {
                model = Overall_1.default;
            }
            console.log(diseaseObj);
            let data = await model.aggregate([
                {
                    $match: diseaseObj,
                },
                {
                    $unwind: '$Topic',
                },
                {
                    $group: {
                        _id: '$Topic',
                        sampleSize: { $sum: '$Sample_Size_Number' },
                        value: { $sum: '$Actual_Data_Value_Number' },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            let forMatedData1 = data.map((d) => {
                return {
                    _id: d._id,
                    sampleSize: d.sampleSize,
                    value: d.value,
                    percentage: (+d.value / +d.sampleSize) * 100
                        ? (+d.value / +d.sampleSize) * 100
                        : 0,
                };
            });
            let raceObj = {
                ...obj,
                Break_Out_Category: 'Race/Ethnicity',
            };
            if (disease) {
                raceObj.Topic = disease;
            }
            else {
                raceObj.Topic = 'Arthritis';
            }
            let data2 = await infoGraphic_1.default.aggregate([
                {
                    $match: raceObj,
                },
                {
                    $unwind: '$Category',
                },
                {
                    $group: {
                        _id: '$Category',
                        sampleSize: { $sum: '$Sample_Size_Number' },
                        value: { $sum: '$Actual_Data_Value_Number' },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            let forMatedData2 = data2.map((d) => {
                return {
                    _id: d._id,
                    sampleSize: d.sampleSize,
                    value: d.value,
                    percentage: (+d.value / +d.sampleSize) * 100
                        ? (+d.value / +d.sampleSize) * 100
                        : 0,
                };
            });
            let ageObj = {
                ...obj,
                Break_Out_Category: 'Age Group',
            };
            if (disease) {
                ageObj.Topic = disease;
            }
            else {
                ageObj.Topic = 'Arthritis';
            }
            let data3 = await infoGraphic_1.default.aggregate([
                {
                    $match: ageObj,
                },
                {
                    $unwind: '$Break_Out',
                },
                {
                    $group: {
                        _id: '$Break_Out',
                        sampleSize: { $sum: '$Sample_Size_Number' },
                        value: { $sum: '$Actual_Data_Value_Number' },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            let forMatedData3 = data3.map((d) => {
                return {
                    _id: d._id,
                    sampleSize: d.sampleSize,
                    value: d.value,
                    percentage: (+d.value / +d.sampleSize) * 100
                        ? (+d.value / +d.sampleSize) * 100
                        : 0,
                };
            });
            let genderObj = {
                ...obj,
                Break_Out_Category: 'Gender',
            };
            if (disease) {
                genderObj.Topic = disease;
            }
            else {
                genderObj.Topic = 'Arthritis';
            }
            let data4 = await infoGraphic_1.default.aggregate([
                {
                    $match: genderObj,
                },
                {
                    $unwind: '$Break_Out',
                },
                {
                    $group: {
                        _id: '$Break_Out',
                        sampleSize: { $sum: '$Sample_Size_Number' },
                        value: { $sum: '$Actual_Data_Value_Number' },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            let forMatedData4 = data4.map((d) => {
                return {
                    _id: d._id,
                    sampleSize: d.sampleSize,
                    value: d.value,
                    percentage: (+d.value / +d.sampleSize) * 100
                        ? (+d.value / +d.sampleSize) * 100
                        : 0,
                };
            });
            return {
                diseases: forMatedData1,
                race: forMatedData2,
                age: forMatedData3,
                sex: forMatedData4,
            };
        }
        else {
            let obj = {};
            if (year) {
                obj.Year = year;
            }
            else {
                obj.Year = '2020';
            }
            if (state) {
                obj.Locationabbr = state;
            }
            if (race) {
                obj.Race = race;
            }
            if (age) {
                obj.ageGroup = age;
            }
            if (sex) {
                obj.Gender = sex;
            }
            console.log(obj);
            let data = await infoGraphicDeath_1.default.aggregate([
                {
                    $match: obj,
                },
                {
                    $unwind: '$Topic',
                },
                {
                    $group: {
                        _id: '$Topic',
                        sampleSize: { $sum: '$PopulationInNumber' },
                        value: { $sum: '$DeathsInNumber' },
                        totalCrudeRate: { $sum: '$CrudeRateInNumber' },
                        numerator: {
                            $sum: { $multiply: ['$DeathsInNumber', '$PopulationInNumber'] },
                        },
                    },
                },
                {
                    $project: {
                        sampleSize: '$sampleSize',
                        value: '$value',
                        totalCrudeRate: '$totalCrudeRate',
                        percentage: { $divide: ['$numerator', '$sampleSize'] },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            // console.log(data[0]);
            // let total1 = data.reduce((acc: any, d: any) => {
            //   acc += d.sampleSize;
            //   return acc;
            // }, 0);
            // let forMatedData1 = data.map((d: any) => {
            //   return {
            //     _id: d._id,
            //     sampleSize: d.sampleSize,
            //     value: d.value,
            //     percentage: (d.sampleSize / total1) * d.totalCrudeRate,
            //   };
            // });
            let forMatedData1 = data;
            let data2 = await infoGraphicDeath_1.default.aggregate([
                {
                    $match: obj,
                },
                {
                    $unwind: '$Race',
                },
                {
                    $group: {
                        _id: '$Race',
                        sampleSize: { $sum: '$PopulationInNumber' },
                        value: { $sum: '$DeathsInNumber' },
                        totalCrudeRate: { $sum: '$CrudeRateInNumber' },
                        numerator: {
                            $sum: { $multiply: ['$DeathsInNumber', '$PopulationInNumber'] },
                        },
                    },
                },
                {
                    $project: {
                        sampleSize: '$sampleSize',
                        value: '$value',
                        totalCrudeRate: '$totalCrudeRate',
                        percentage: { $divide: ['$numerator', '$sampleSize'] },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            // let total2 = data2.reduce((acc: any, d: any) => {
            //   acc += d.sampleSize;
            //   return acc;
            // }, 0);
            // let forMatedData2 = data2.map((d: any) => {
            //   return {
            //     _id: d._id,
            //     sampleSize: d.sampleSize,
            //     value: d.value,
            //     percentage: (d.sampleSize / total2) * d.totalCrudeRate,
            //   };
            // });
            let forMatedData2 = data2;
            let data3 = await infoGraphicDeath_1.default.aggregate([
                {
                    $match: obj,
                },
                {
                    $unwind: '$ageGroup',
                },
                {
                    $group: {
                        _id: '$ageGroup',
                        sampleSize: { $sum: '$PopulationInNumber' },
                        value: { $sum: '$DeathsInNumber' },
                        totalCrudeRate: { $sum: '$CrudeRateInNumber' },
                        numerator: {
                            $sum: { $multiply: ['$DeathsInNumber', '$PopulationInNumber'] },
                        },
                    },
                },
                {
                    $project: {
                        sampleSize: '$sampleSize',
                        value: '$value',
                        totalCrudeRate: '$totalCrudeRate',
                        percentage: { $divide: ['$numerator', '$sampleSize'] },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            // let total3 = data3.reduce((acc: any, d: any) => {
            //   acc += d.sampleSize;
            //   return acc;
            // }, 0);
            // let forMatedData3 = data3.map((d: any) => {
            //   return {
            //     _id: d._id,
            //     sampleSize: d.sampleSize,
            //     value: d.value,
            //     percentage: (d.sampleSize / total3) * d.totalCrudeRate,
            //   };
            // });
            let forMatedData3 = data3;
            let data4 = await infoGraphicDeath_1.default.aggregate([
                {
                    $match: obj,
                },
                {
                    $unwind: '$Gender',
                },
                {
                    $group: {
                        _id: '$Gender',
                        sampleSize: { $sum: '$PopulationInNumber' },
                        value: { $sum: '$DeathsInNumber' },
                        totalCrudeRate: { $sum: '$CrudeRateInNumber' },
                        numerator: {
                            $sum: { $multiply: ['$DeathsInNumber', '$PopulationInNumber'] },
                        },
                    },
                },
                {
                    $project: {
                        sampleSize: '$sampleSize',
                        value: '$value',
                        totalCrudeRate: '$totalCrudeRate',
                        percentage: { $divide: ['$numerator', '$sampleSize'] },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            // let total4 = data4.reduce((acc: any, d: any) => {
            //   acc += d.sampleSize;
            //   return acc;
            // }, 0);
            // let forMatedData4 = data4.map((d: any) => {
            //   return {
            //     _id: d._id,
            //     sampleSize: d.sampleSize,
            //     value: d.value,
            //     percentage: (d.sampleSize / total4) * d.totalCrudeRate,
            //   };
            // });
            let forMatedData4 = data4;
            return {
                diseases: forMatedData1,
                race: forMatedData2,
                age: forMatedData3,
                sex: forMatedData4,
            };
        }
    }
    async yearBasedAggregation(disease, state, race, age, sex, dataSet) {
        if (dataSet === 'incidence' || !dataSet) {
            let obj = {};
            let allYearsData = [];
            if (disease) {
                obj.Topic = disease;
            }
            else {
                obj.Topic = 'Arthritis';
            }
            if (state) {
                obj.Locationabbr = state;
            }
            if (race || age || sex) {
                if (race) {
                    obj.Category = race;
                }
                else if (age) {
                    obj.Category = age;
                }
                else {
                    obj.Category = sex;
                }
                // obj.Break_Out = {
                //   $ne: 'Overall',
                // }
                let data = await infoGraphic_1.default.aggregate([
                    {
                        $match: obj,
                    },
                    {
                        $unwind: '$Year',
                    },
                    {
                        $group: {
                            _id: '$Year',
                            sampleSize: { $sum: '$Sample_Size_Number' },
                            value: { $sum: '$Actual_Data_Value_Number' },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
                let forMatedData1 = data.map((d) => {
                    return {
                        _id: d._id,
                        sampleSize: d.sampleSize,
                        value: d.value,
                        percentage: (+d.value / +d.sampleSize) * 100
                            ? (+d.value / +d.sampleSize) * 100
                            : 0,
                    };
                });
                return forMatedData1;
            }
            else {
                let data = await Overall_1.default.aggregate([
                    {
                        $match: obj,
                    },
                    {
                        $unwind: '$Year',
                    },
                    {
                        $group: {
                            _id: '$Year',
                            sampleSize: { $sum: '$Sample_Size_Number' },
                            value: { $sum: '$Actual_Data_Value_Number' },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
                let forMatedData1 = data.map((d) => {
                    return {
                        _id: d._id,
                        sampleSize: d.sampleSize,
                        value: d.value,
                        percentage: (+d.value / +d.sampleSize) * 100
                            ? (+d.value / +d.sampleSize) * 100
                            : 0,
                    };
                });
                return forMatedData1;
            }
        }
        else {
            let obj = {};
            // let allYearsData: any[] = [];
            if (disease) {
                obj.Topic = disease;
            }
            if (state) {
                obj.Locationabbr = state;
            }
            if (race) {
                obj.Race = race;
            }
            if (age) {
                obj.ageGroup = age;
            }
            if (sex) {
                obj.Gender = sex;
            }
            if (Object.keys(obj).length === 0) {
                return [];
            }
            // obj.Break_Out = {
            //   $ne: 'Overall',
            // }
            let data = await infoGraphicDeath_1.default.aggregate([
                {
                    $match: obj,
                },
                {
                    $unwind: '$Year',
                },
                {
                    $group: {
                        _id: '$Year',
                        sampleSize: { $sum: '$PopulationInNumber' },
                        value: { $sum: '$DeathsInNumber' },
                        numerator: {
                            $sum: { $multiply: ['$DeathsInNumber', '$PopulationInNumber'] },
                        },
                    },
                },
                {
                    $project: {
                        sampleSize: '$sampleSize',
                        value: '$value',
                        totalCrudeRate: '$totalCrudeRate',
                        percentage: { $divide: ['$numerator', '$sampleSize'] },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            // let total1 = data.reduce((acc: any, d: any) => {
            //   acc += d.sampleSize;
            //   return acc;
            // }, 0);
            // let forMatedData1 = data.map((d: any) => {
            //   return {
            //     _id: d._id,
            //     sampleSize: d.sampleSize,
            //     value: d.value,
            //     percentage: (100 / total1) * d.sampleSize,
            //   };
            // });
            return data;
        }
    }
    async getCompareData(disease, type, race, age, sex, state, dataSet) {
        if (dataSet === 'incidence' || !dataSet) {
            let obj = {
                Topic: { $ne: 'Vision' },
                Break_Out_Category: { $ne: 'Overall' },
            };
            if (state) {
                obj.Locationabbr = state;
            }
            let years = [
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
                '2021',
            ];
            let formateData = [];
            let matchObj = {};
            if (type === 'disease') {
                matchObj = {
                    ...obj,
                };
                if (race) {
                    matchObj.Category = race;
                }
                else if (sex) {
                    matchObj.Category = sex;
                }
                else if (age) {
                    matchObj.Category = age;
                }
                console.log(matchObj);
                for (let i = 0; i < years.length; i++) {
                    matchObj.Year = years[i];
                    let data = await infoGraphic_1.default.aggregate([
                        {
                            $match: matchObj,
                        },
                        {
                            $unwind: '$Topic',
                        },
                        {
                            $group: {
                                _id: '$Topic',
                                sampleSize: { $sum: '$Sample_Size_Number' },
                                value: { $sum: '$Actual_Data_Value_Number' },
                            },
                        },
                        {
                            $sort: {
                                _id: 1,
                            },
                        },
                    ]);
                    let forMatedData = data.map((d) => {
                        return {
                            _id: d._id,
                            sampleSize: d.sampleSize,
                            value: d.value,
                            percentage: (+d.value / +d.sampleSize) * 100
                                ? (+d.value / +d.sampleSize) * 100
                                : 0,
                        };
                    });
                    formateData.push({
                        year: years[i],
                        fotmatedData: forMatedData,
                    });
                }
                return formateData;
            }
            else if (type === 'sex') {
                if (!disease) {
                    obj.Topic = 'Arthritis';
                }
                else {
                    obj.Topic = disease;
                }
                matchObj = {
                    ...obj,
                    Break_Out_Category: 'Gender',
                };
                console.log(matchObj);
            }
            else if (type === 'age') {
                if (!disease) {
                    obj.Topic = 'Arthritis';
                }
                else {
                    obj.Topic = disease;
                }
                matchObj = {
                    ...obj,
                    Break_Out_Category: 'Age Group',
                };
            }
            else if (type === 'race') {
                if (!disease) {
                    obj.Topic = 'Arthritis';
                }
                else {
                    obj.Topic = disease;
                }
                matchObj = {
                    ...obj,
                    Break_Out_Category: 'Race/Ethnicity',
                };
                for (let i = 0; i < years.length; i++) {
                    matchObj.Year = years[i];
                    let data = await infoGraphic_1.default.aggregate([
                        {
                            $match: matchObj,
                        },
                        {
                            $unwind: '$Category',
                        },
                        {
                            $group: {
                                _id: '$Category',
                                sampleSize: { $sum: '$Sample_Size_Number' },
                                value: { $sum: '$Actual_Data_Value_Number' },
                            },
                        },
                        {
                            $sort: {
                                _id: 1,
                            },
                        },
                    ]);
                    let forMatedData = data.map((d) => {
                        return {
                            _id: d._id,
                            sampleSize: d.sampleSize,
                            value: d.value,
                            percentage: (+d.value / +d.sampleSize) * 100
                                ? (+d.value / +d.sampleSize) * 100
                                : 0,
                        };
                    });
                    formateData.push({
                        year: years[i],
                        fotmatedData: forMatedData,
                    });
                }
                return formateData;
            }
            for (let i = 0; i < years.length; i++) {
                matchObj.Year = years[i];
                let data = await infoGraphic_1.default.aggregate([
                    {
                        $match: matchObj,
                    },
                    {
                        $unwind: '$Break_Out',
                    },
                    {
                        $group: {
                            _id: '$Break_Out',
                            sampleSize: { $sum: '$Sample_Size_Number' },
                            value: { $sum: '$Actual_Data_Value_Number' },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
                let forMatedData = data.map((d) => {
                    return {
                        _id: d._id,
                        sampleSize: d.sampleSize,
                        value: d.value,
                        percentage: (+d.value / +d.sampleSize) * 100
                            ? (+d.value / +d.sampleSize) * 100
                            : 0,
                    };
                });
                formateData.push({
                    year: years[i],
                    fotmatedData: forMatedData,
                });
            }
            return formateData;
        }
        else {
            let obj = {};
            let group = {
                sampleSize: { $sum: '$PopulationInNumber' },
                value: { $sum: '$DeathsInNumber' },
                numerator: {
                    $sum: { $multiply: ['$DeathsInNumber', '$PopulationInNumber'] },
                },
            };
            if (state) {
                obj.Locationabbr = state;
            }
            if (race) {
                obj.Race = race;
            }
            if (age) {
                obj.ageGroup = age;
            }
            if (sex) {
                obj.Gender = sex;
            }
            let unwind = '';
            if (type === 'disease') {
                delete obj.disease;
                unwind = '$Topic';
                group._id = '$Topic';
            }
            else if (type === 'sex') {
                delete obj.Gender;
                unwind = '$Gender';
                group._id = '$Gender';
            }
            else if (type === 'age') {
                delete obj.ageGroup;
                unwind = '$ageGroup';
                group._id = '$ageGroup';
            }
            else if (type === 'race') {
                delete obj.Race;
                unwind = '$Race';
                group._id = '$Race';
            }
            let years = [
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
            ];
            let formateData = [];
            // console.log(group);
            // console.log(obj);
            for (let i = 0; i < years.length; i++) {
                obj.Year = years[i];
                let data = await infoGraphicDeath_1.default.aggregate([
                    {
                        $match: obj,
                    },
                    {
                        $unwind: unwind,
                    },
                    {
                        $group: group,
                    },
                    {
                        $project: {
                            sampleSize: '$sampleSize',
                            value: '$value',
                            totalCrudeRate: '$totalCrudeRate',
                            percentage: { $divide: ['$numerator', '$sampleSize'] },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
                // let forMatedData = data.map((d: any) => {
                //   return {
                //     _id: d._id,
                //     sampleSize: d.sampleSize,
                //     value: d.value,
                //     percentage:
                //       (+d.value / +d.sampleSize) * 100
                //         ? (+d.value / +d.sampleSize) * 100
                //         : 0,
                //   };
                // });
                formateData.push({
                    year: years[i],
                    fotmatedData: data,
                });
            }
            return formateData;
        }
    }
    async getStateData(year, disease, 
    // @Arg('state', { nullable: true }) state: String,
    race, age, sex, dataSet) {
        if (dataSet === 'incidence' || !dataSet) {
            console.log('incidence');
            let obj = {};
            if (year) {
                obj.Year = year;
            }
            else {
                obj.Year = '2021';
            }
            if (disease) {
                obj.Topic = disease;
            }
            else {
                obj.Topic = 'Arthritis';
            }
            if (race) {
                obj.Category = race;
            }
            else if (sex) {
                obj.Category = sex;
            }
            else if (age) {
                obj.Category = age;
            }
            console.log(obj);
            let data = await infoGraphic_1.default.aggregate([
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
                        sampleSize: { $sum: '$Sample_Size_Number' },
                        value: { $sum: '$Actual_Data_Value_Number' },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            let forMatedData = data.map((d) => {
                return {
                    _id: d._id,
                    sampleSize: d.sampleSize,
                    value: d.value,
                    fullForm: d.fullForm,
                    percentage: (+d.value / +d.sampleSize) * 100
                        ? (+d.value / +d.sampleSize) * 100
                        : 0,
                    prevalence: 0,
                };
            });
            let returnObj = {};
            let sortedArray = forMatedData.sort((data1, data2) => data1.percentage - data2.percentage);
            let length = sortedArray.length;
            let t25 = Math.floor((25 / 100) * (length + 1));
            let t50 = Math.floor((50 / 100) * (length + 1));
            let t75 = Math.floor((75 / 100) * (length + 1));
            console.log(t25);
            console.log(t50);
            console.log(t75);
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
        else {
            let obj = {};
            if (year) {
                obj.Year = year;
            }
            else {
                obj.Year = '2020';
            }
            if (disease) {
                obj.Topic = disease;
            }
            else {
                obj.Topic = 'Alzheimer & Dementia';
            }
            if (race) {
                obj.Race = race;
            }
            if (age) {
                obj.ageGroup = age;
            }
            if (sex) {
                obj.Gender = sex;
            }
            console.log(obj);
            let data = await infoGraphicDeath_1.default.aggregate([
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
                        sampleSize: { $sum: '$PopulationInNumber' },
                        value: { $sum: '$DeathsInNumber' },
                        numerator: {
                            $sum: { $multiply: ['$DeathsInNumber', '$PopulationInNumber'] },
                        },
                    },
                },
                {
                    $project: {
                        sampleSize: '$sampleSize',
                        value: '$value',
                        totalCrudeRate: '$totalCrudeRate',
                        percentage: { $divide: ['$numerator', '$sampleSize'] },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ]);
            // let forMatedData = data.map((d: any) => {
            //   return {
            //     _id: d._id,
            //     sampleSize: d.sampleSize,
            //     value: d.value,
            //     fullForm: d.fullForm,
            //     percentage:
            //       (+d.value / +d.sampleSize) * 100
            //         ? (+d.value / +d.sampleSize) * 100
            //         : 0,
            //     prevalence: 0,
            //   };
            // });
            let forMatedData = data;
            let returnObj = {};
            // console.log(forMatedData);
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
    }
    async addClasses() {
        console.log('add classes');
        let data1 = [
            {
                day: 'Tue',
                code: 'SE225',
                myCode: 'SWE426',
                time: '1:30',
                room: '612',
                name: 'Distributive Computing and Network Security',
                TI: 'NIR',
                sec: 'A',
            },
            {
                day: 'Tue',
                code: 'SE225',
                myCode: 'SWE426',
                time: '2:30',
                room: '712B',
                name: 'Distributive Computing and Network Security',
                TI: 'JNM',
                sec: 'B',
            },
            {
                day: 'Wed',
                code: 'SE225',
                myCode: 'SWE426',
                time: '1:30',
                room: '603',
                name: 'Distributive Computing and Network Security',
                TI: 'NIR',
                sec: 'A',
            },
            {
                day: 'Wed',
                code: 'SE225',
                myCode: 'SWE426',
                time: '12:30',
                room: '1017',
                name: 'Distributive Computing and Network Security',
                TI: 'JNM',
                sec: 'B',
            },
            {
                day: 'Tue',
                code: 'SE226',
                myCode: 'SWE426',
                time: '3:30',
                room: '609',
                name: 'Distributive Computing and Network Security',
                TI: 'JNM',
                sec: 'B',
                lab: true,
            },
            {
                day: 'Tue',
                code: 'SE226',
                myCode: 'SWE426',
                time: '11:30',
                room: '601',
                name: 'Distributive Computing and Network Security',
                TI: 'SA',
                sec: 'A',
                subSec: '1',
                lab: true,
            },
            {
                day: 'Wed',
                code: 'SE226',
                myCode: 'SWE426',
                time: '3:30',
                room: '616',
                name: 'Distributive Computing and Network Security',
                TI: 'SA',
                sec: 'A',
                subSec: '2',
                lab: true,
            },
            {
                day: 'Sat',
                code: 'SE331',
                myCode: 'SWE332',
                time: '8:30',
                room: '610',
                name: 'Software Engineering Project-II (Web Programming)',
                TI: 'AKS',
                sec: 'A',
                subSec: '2',
            },
            {
                day: 'Sat',
                code: 'SE331',
                myCode: 'SWE332',
                time: '9:30',
                room: '610',
                name: 'Software Engineering Project-II (Web Programming)',
                TI: 'AKS',
                sec: 'A',
                subSec: '2',
            },
            {
                day: 'Sun',
                code: 'SE331',
                myCode: 'SWE332',
                time: '8:30',
                room: '610',
                name: 'Software Engineering Project-II (Web Programming)',
                TI: 'MRA',
                sec: 'A',
                subSec: '1',
            },
            {
                day: 'Sun',
                code: 'SE331',
                myCode: 'SWE332',
                time: '9:30',
                room: '610',
                name: 'Software Engineering Project-II (Web Programming)',
                TI: 'MRA',
                sec: 'A',
                subSec: '1',
            },
            {
                day: 'Tue',
                code: 'SE331',
                myCode: 'SWE332',
                time: '12:30',
                room: '601',
                name: 'Software Engineering Project-II (Web Programming)',
                TI: 'MRA',
                sec: 'A',
                subSec: '2',
            },
            {
                day: 'Tue',
                code: 'SE331',
                myCode: 'SWE332',
                time: '1:30',
                room: '601',
                name: 'Software Engineering Project-II (Web Programming)',
                TI: 'MRA',
                sec: 'A',
                subSec: '2',
            },
            {
                day: 'Wed',
                code: 'SE331',
                myCode: 'SWE332',
                time: '9:30',
                room: '610',
                name: 'Software Engineering Project-II (Web Programming)',
                TI: 'MSA',
                sec: 'A',
                subSec: '1',
            },
            {
                day: 'Wed',
                code: 'SE331',
                myCode: 'SWE332',
                time: '10:30',
                room: '610',
                name: 'Software Engineering Project-II (Web Programming)',
                TI: 'MSA',
                sec: 'A',
                subSec: '1',
            },
            {
                day: 'Sun',
                code: 'GE235',
                myCode: 'ACC124',
                time: '2:30',
                room: '710',
                name: 'Principles of Accounting',
                TI: 'MJM',
                sec: 'A',
            },
            {
                day: 'Sun',
                code: 'GE235',
                myCode: 'ACC124',
                time: '3:30',
                room: '710',
                name: 'Principles of Accounting',
                TI: 'MJM',
                sec: 'A',
            },
            {
                day: 'Sat',
                code: 'SE411',
                myCode: 'SWE212',
                time: '8:30',
                room: '603',
                name: 'Software Project Management',
                TI: 'AA',
                sec: 'A',
            },
            {
                day: 'Sat',
                code: 'SE411',
                myCode: 'SWE212',
                time: '9:30',
                room: '603',
                name: 'Software Project Management',
                TI: 'AA',
                sec: 'A',
            },
            {
                day: 'Sun',
                code: 'SE411',
                myCode: 'SWE212',
                time: '12:30',
                room: '704',
                name: 'Software Project Management',
                TI: 'MKS',
                sec: 'A',
            },
            {
                day: 'Thu',
                code: 'SE411',
                myCode: 'SWE212',
                time: '1:30',
                room: '603',
                name: 'Software Project Management',
                TI: 'MKS',
                sec: 'A',
            },
        ];
        await class_1.default.insertMany(data1);
        return 'done';
    }
    async filterClasses(day, code, time, room, name, TI, sec, subSec, lab) {
        let obj = {};
        if (day)
            obj.day = day;
        if (code)
            obj.code = code;
        if (time)
            obj.time = time;
        if (room)
            obj.room = room;
        if (name)
            obj.name = name;
        if (TI)
            obj.TI = TI;
        if (sec)
            obj.sec = sec;
        if (subSec)
            obj.subSec = subSec;
        if (lab)
            obj.lab = lab;
        let data = await class_1.default.find(obj).sort({
            time: 1,
        });
        return data;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "modifyData", null);
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "modifyDataOverall", null);
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "storeData", null);
__decorate([
    (0, type_graphql_1.Query)(() => ReturnInfoData_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('disease', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('age', { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('sex', { nullable: true })),
    __param(6, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "showInfoData", null);
__decorate([
    (0, type_graphql_1.Query)(() => [FotmatedData_1.default]),
    __param(0, (0, type_graphql_1.Arg)('disease', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('age', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('sex', { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "yearBasedAggregation", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Compare_1.default]),
    __param(0, (0, type_graphql_1.Arg)('disease', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('type')),
    __param(2, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('age', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('sex', { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __param(6, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "getCompareData", null);
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('disease', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('race', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('age', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('sex', { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('dataSet', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "getStateData", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "addClasses", null);
__decorate([
    (0, type_graphql_1.Query)(() => [myClass_1.default]),
    __param(0, (0, type_graphql_1.Arg)('day', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('code', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('time', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('room', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('name', { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('TI', { nullable: true })),
    __param(6, (0, type_graphql_1.Arg)('sec', { nullable: true })),
    __param(7, (0, type_graphql_1.Arg)('subSec', { nullable: true })),
    __param(8, (0, type_graphql_1.Arg)('lab', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        Boolean]),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "filterClasses", null);
FoodResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], FoodResolver);
exports.default = FoodResolver;
