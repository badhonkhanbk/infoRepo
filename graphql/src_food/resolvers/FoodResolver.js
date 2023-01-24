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
const FotmatedData_1 = __importDefault(require("../schemas/FotmatedData"));
const ReturnInfoData_1 = __importDefault(require("../schemas/ReturnInfoData"));
let FoodResolver = class FoodResolver {
    // @Query(() => String)
    // async csvConverter() {
    //   const csvFilePath = './temp/info.csv';
    //   const jsonArray = await csv().fromFile(csvFilePath);
    //   fs.writeFileSync('./temp/infoData.json', JSON.stringify(jsonArray));
    //   return 'done';
    // }
    // @Query(() => String)
    // async modifyData() {
    //   let allData = await InfoGraphic.find().skip(107000);
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
    //     console.log(i);
    //   }
    //   return 'done';
    // }
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
    // @Query(() => String)
    // async storeData() {
    //   const data: any = JSON.parse(
    //     fs.readFileSync('./temp/infoData.json', 'utf-8')
    //   );
    //   for (let i = 89521; i < data.length; i++) {
    //     await InfoGraphic.create(data[i]);
    //   }
    //   return 'done';
    // }
    // @Mutation(() => String)
    // async deleteData() {
    //   await InfoGraphic.deleteMany({});
    //   return 'done';
    // }
    // @Query(() => String)
    // async filterData() {
    //   let data = await InfoGraphic.find({
    //     topic: 'Depression',
    //     Year: '2011',
    //   }).select('_id year');
    //   console.log(data.length);
    //   return 'done';
    // }
    // @Query(() => String)
    // async readFile() {
    //   const data = JSON.parse(fs.readFileSync('./temp/infoData.json', 'utf-8'));
    //   let educationAttainedCategory: any[] = [];
    //   let overAllCategory: any[] = [];
    //   let houseHoldIncomeCategory: any[] = [];
    //   let ageGroupCategory: any[] = [];
    //   let raceCategory: any[] = [];
    //   let genderCategory: any[] = [];
    //   // [
    //   //   "Education Attained",
    //   //   "Overall",
    //   //   "Household Income",
    //   //   "Age Group",
    //   //   "Race/Ethnicity",
    //   //   "Gender"
    //   // ]
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].Break_Out_Category === 'Education Attained') {
    //       if (!educationAttainedCategory.includes(data[i].Break_Out)) {
    //         educationAttainedCategory.push(data[i].Break_Out);
    //       }
    //     } else if (data[i].Break_Out_Category === 'Overall') {
    //       if (!overAllCategory.includes(data[i].Break_Out)) {
    //         overAllCategory.push(data[i].Break_Out);
    //       }
    //     } else if (data[i].Break_Out_Category === 'Household Income') {
    //       if (!houseHoldIncomeCategory.includes(data[i].Break_Out)) {
    //         houseHoldIncomeCategory.push(data[i].Break_Out);
    //       }
    //     } else if (data[i].Break_Out_Category === 'Age Group') {
    //       if (!ageGroupCategory.includes(data[i].Break_Out)) {
    //         ageGroupCategory.push(data[i].Break_Out);
    //       }
    //     } else if (data[i].Break_Out_Category === 'Race/Ethnicity') {
    //       if (!raceCategory.includes(data[i].Break_Out)) {
    //         raceCategory.push(data[i].Break_Out);
    //       }
    //     } else if (data[i].Break_Out_Category === 'Gender') {
    //       if (!genderCategory.includes(data[i].Break_Out)) {
    //         genderCategory.push(data[i].Break_Out);
    //       }
    //     }
    //   }
    //   console.log('ea', educationAttainedCategory);
    //   console.log('OA', overAllCategory);
    //   console.log('HH', houseHoldIncomeCategory);
    //   console.log('AG', ageGroupCategory);
    //   console.log('RE', raceCategory);
    //   console.log('G', genderCategory);
    //   fs.writeFileSync(
    //     './temp/educationAttainedCategory.json',
    //     JSON.stringify(educationAttainedCategory)
    //   );
    //   fs.writeFileSync(
    //     './temp/overAllCategory.json',
    //     JSON.stringify(overAllCategory)
    //   );
    //   fs.writeFileSync(
    //     './temp/houseHoldIncomeCategory.json',
    //     JSON.stringify(houseHoldIncomeCategory)
    //   );
    //   fs.writeFileSync(
    //     './temp/ageGroupCategory.json',
    //     JSON.stringify(ageGroupCategory)
    //   );
    //   fs.writeFileSync('./temp/raceCategory.json', JSON.stringify(raceCategory));
    //   fs.writeFileSync(
    //     './temp/genderCategory.json',
    //     JSON.stringify(genderCategory)
    //   );
    //   // fs.writeFileSync('./temp/years.json', JSON.stringify(years));
    //   // fs.writeFileSync('./temp/locations.json', JSON.stringify(locations));
    //   // fs.writeFileSync('./temp/topics.json', JSON.stringify(topics));
    //   //fs.writeFileSync('./temp/breakOuts.json', JSON.stringify(breakOuts));
    //   //fs.writeFileSync('./temp/breakOutsCategory.json', JSON.stringify(breakOutCategory));
    //   // fs.writeFileSync('./temp/locationDesc.json', JSON.stringify(locationDesc));
    //   return '';
    // }
    async showInfoData(year, state) {
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
        let data = await Overall_1.default.aggregate([
            {
                $match: obj,
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
        let total1 = data.reduce((acc, d) => {
            acc += d.sampleSize;
            return acc;
        }, 0);
        let forMatedData1 = data.map((d) => {
            return {
                _id: d._id,
                sampleSize: d.sampleSize,
                value: d.value,
                percentage: (100 / total1) * d.sampleSize,
            };
        });
        let raceObj = {
            ...obj,
            Break_Out_Category: 'Race/Ethnicity',
        };
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
        let total2 = data2.reduce((acc, d) => {
            acc += d.sampleSize;
            return acc;
        }, 0);
        let forMatedData2 = data2.map((d) => {
            return {
                _id: d._id,
                sampleSize: d.sampleSize,
                value: d.value,
                percentage: (100 / total2) * d.sampleSize,
            };
        });
        let ageObj = {
            ...obj,
            Break_Out_Category: 'Age Group',
        };
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
        let total3 = data3.reduce((acc, d) => {
            acc += d.sampleSize;
            return acc;
        }, 0);
        let forMatedData3 = data3.map((d) => {
            return {
                _id: d._id,
                sampleSize: d.sampleSize,
                value: d.value,
                percentage: (100 / total3) * d.sampleSize,
            };
        });
        let genderObj = {
            ...obj,
            Break_Out_Category: 'Gender',
        };
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
        let total4 = data4.reduce((acc, d) => {
            acc += d.sampleSize;
            return acc;
        }, 0);
        console.log('total4', total4);
        let forMatedData4 = data4.map((d) => {
            return {
                _id: d._id,
                sampleSize: d.sampleSize,
                value: d.value,
                percentage: (100 / total4) * d.sampleSize,
            };
        });
        return {
            diseases: forMatedData1,
            race: forMatedData2,
            age: forMatedData3,
            sex: forMatedData4,
        };
    }
    async yearBasedAggregation(disease, state, race, age, sex) {
        let obj = {};
        let allYearsData = [];
        if (disease) {
            obj.Topic = disease;
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
            let total1 = data.reduce((acc, d) => {
                acc += d.sampleSize;
                return acc;
            }, 0);
            let forMatedData1 = data.map((d) => {
                return {
                    _id: d._id,
                    sampleSize: d.sampleSize,
                    value: d.value,
                    percentage: (100 / total1) * d.sampleSize,
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
            let total1 = data.reduce((acc, d) => {
                acc += d.sampleSize;
                return acc;
            }, 0);
            let forMatedData1 = data.map((d) => {
                return {
                    _id: d._id,
                    sampleSize: d.sampleSize,
                    value: d.value,
                    percentage: (100 / total1) * d.sampleSize,
                };
            });
            return forMatedData1;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "modifyDataOverall", null);
__decorate([
    (0, type_graphql_1.Query)(() => ReturnInfoData_1.default),
    __param(0, (0, type_graphql_1.Arg)('year', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('state', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "yearBasedAggregation", null);
FoodResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], FoodResolver);
exports.default = FoodResolver;
