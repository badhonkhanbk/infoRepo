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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const csvtojson_1 = __importDefault(require("csvtojson"));
const infoGraphic_1 = __importDefault(require("../../../models/infoGraphic"));
const fs_1 = __importDefault(require("fs"));
let FoodResolver = class FoodResolver {
    async csvConverter() {
        const csvFilePath = './temp/info.csv';
        const jsonArray = await (0, csvtojson_1.default)().fromFile(csvFilePath);
        fs_1.default.writeFileSync('./temp/infoData.json', JSON.stringify(jsonArray));
        return 'done';
    }
    async modifyData() {
        let allData = await infoGraphic_1.default.find();
        for (let i = 0; i < allData.length; i++) {
            let sampleSizeInNumber;
            let dataValueInNumber;
            let actualDataValueInNumber;
            let Category;
            if (allData[i].Sample_Size === '0') {
                sampleSizeInNumber = 0;
                dataValueInNumber = 0;
                actualDataValueInNumber = 0;
            }
            else {
                sampleSizeInNumber = Number(allData[i].Sample_Size);
                dataValueInNumber = Number(allData[i].Data_value);
                actualDataValueInNumber =
                    (100 / dataValueInNumber) * sampleSizeInNumber;
            }
            if (allData[i].Break_Out_Category === 'Race/Ethnicity') {
                if (allData[i].Break_Out ===
                    'Native Hawaiian or other Pacific Islander, non-Hispanic' ||
                    allData[i].Break_Out ===
                        'American Indian or Alaskan Native, non-Hispanic' ||
                    allData[i].Break_Out === 'Multiracial, non-Hispanic' ||
                    allData[i].Break_Out === 'Other, non-Hispanic') {
                    Category = 'Other';
                }
                else if (allData[i].Break_Out === 'Hispanic') {
                    Category = 'Hispanic';
                }
                else if (allData[i].Break_Out === 'White, non-Hispanic') {
                    Category = 'White';
                }
                else if (allData[i].Break_Out === 'Black, non-Hispanic') {
                    Category = 'Black';
                }
                else if (allData[i].Break_Out === 'Asian, non-Hispanic') {
                    Category = 'Asian';
                }
            }
            else {
                Category = allData[i].Break_Out;
            }
            await infoGraphic_1.default.findByIdAndUpdate(allData[i]._id, {
                Sample_Size_Number: sampleSizeInNumber,
                Data_value_Number: dataValueInNumber,
                Actual_Data_Value_Number: actualDataValueInNumber,
                Category,
            });
        }
    }
    async storeData() {
        const data = JSON.parse(fs_1.default.readFileSync('./temp/infoData.json', 'utf-8'));
        for (let i = 89521; i < data.length; i++) {
            await infoGraphic_1.default.create(data[i]);
        }
        return 'done';
    }
    async deleteData() {
        await infoGraphic_1.default.deleteMany({});
        return 'done';
    }
    async filterData() {
        let data = await infoGraphic_1.default.find({
            topic: 'Depression',
            Year: '2011',
        }).select('_id year');
        console.log(data.length);
        return 'done';
    }
    async readFile() {
        const data = JSON.parse(fs_1.default.readFileSync('./temp/infoData.json', 'utf-8'));
        let educationAttainedCategory = [];
        let overAllCategory = [];
        let houseHoldIncomeCategory = [];
        let ageGroupCategory = [];
        let raceCategory = [];
        let genderCategory = [];
        // [
        //   "Education Attained",
        //   "Overall",
        //   "Household Income",
        //   "Age Group",
        //   "Race/Ethnicity",
        //   "Gender"
        // ]
        for (let i = 0; i < data.length; i++) {
            if (data[i].Break_Out_Category === 'Education Attained') {
                if (!educationAttainedCategory.includes(data[i].Break_Out)) {
                    educationAttainedCategory.push(data[i].Break_Out);
                }
            }
            else if (data[i].Break_Out_Category === 'Overall') {
                if (!overAllCategory.includes(data[i].Break_Out)) {
                    overAllCategory.push(data[i].Break_Out);
                }
            }
            else if (data[i].Break_Out_Category === 'Household Income') {
                if (!houseHoldIncomeCategory.includes(data[i].Break_Out)) {
                    houseHoldIncomeCategory.push(data[i].Break_Out);
                }
            }
            else if (data[i].Break_Out_Category === 'Age Group') {
                if (!ageGroupCategory.includes(data[i].Break_Out)) {
                    ageGroupCategory.push(data[i].Break_Out);
                }
            }
            else if (data[i].Break_Out_Category === 'Race/Ethnicity') {
                if (!raceCategory.includes(data[i].Break_Out)) {
                    raceCategory.push(data[i].Break_Out);
                }
            }
            else if (data[i].Break_Out_Category === 'Gender') {
                if (!genderCategory.includes(data[i].Break_Out)) {
                    genderCategory.push(data[i].Break_Out);
                }
            }
        }
        console.log('ea', educationAttainedCategory);
        console.log('OA', overAllCategory);
        console.log('HH', houseHoldIncomeCategory);
        console.log('AG', ageGroupCategory);
        console.log('RE', raceCategory);
        console.log('G', genderCategory);
        fs_1.default.writeFileSync('./temp/educationAttainedCategory.json', JSON.stringify(educationAttainedCategory));
        fs_1.default.writeFileSync('./temp/overAllCategory.json', JSON.stringify(overAllCategory));
        fs_1.default.writeFileSync('./temp/houseHoldIncomeCategory.json', JSON.stringify(houseHoldIncomeCategory));
        fs_1.default.writeFileSync('./temp/ageGroupCategory.json', JSON.stringify(ageGroupCategory));
        fs_1.default.writeFileSync('./temp/raceCategory.json', JSON.stringify(raceCategory));
        fs_1.default.writeFileSync('./temp/genderCategory.json', JSON.stringify(genderCategory));
        // fs.writeFileSync('./temp/years.json', JSON.stringify(years));
        // fs.writeFileSync('./temp/locations.json', JSON.stringify(locations));
        // fs.writeFileSync('./temp/topics.json', JSON.stringify(topics));
        //fs.writeFileSync('./temp/breakOuts.json', JSON.stringify(breakOuts));
        //fs.writeFileSync('./temp/breakOutsCategory.json', JSON.stringify(breakOutCategory));
        // fs.writeFileSync('./temp/locationDesc.json', JSON.stringify(locationDesc));
        return '';
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "csvConverter", null);
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
], FoodResolver.prototype, "storeData", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "deleteData", null);
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "filterData", null);
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodResolver.prototype, "readFile", null);
FoodResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], FoodResolver);
exports.default = FoodResolver;
