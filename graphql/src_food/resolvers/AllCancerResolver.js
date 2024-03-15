"use strict";
// import { Resolver, Mutation, ID, Query, Arg } from 'type-graphql';
// import AllCancerModel from '../../../models/allcancer';
// import ProportionGenderData from '../schemas/ProportionGender';
// import ProportionGenderString from '../schemas/ProportionGenderString';
// import fs from 'fs';
// import cancerResolver from './CancerResolver';
// import NewAllCancer from '../../../models/newAllCancer';
// let ALLYEAR = [
//   '1999',
//   '2000',
//   '2001',
//   '2002',
//   '2003',
//   '2004',
//   '2005',
//   '2006',
//   '2007',
//   '2008',
//   '2009',
//   '2010',
//   '2011',
//   '2012',
//   '2013',
//   '2014',
//   '2015',
//   // '2015-2019',
//   '2016',
//   '2017',
//   '2018',
//   '2019',
// ];
// let allState = [
//   'Alabama',
//   'Alaska',
//   'Arizona',
//   'Arkansas',
//   'California',
//   'Colorado',
//   'Connecticut',
//   'Delaware',
//   'District of Columbia',
//   'Florida',
//   'Georgia',
//   'Hawaii',
//   'Idaho',
//   'Illinois',
//   'Indiana',
//   'Iowa',
//   'Kansas',
//   'Kentucky',
//   'Louisiana',
//   'Maine',
//   'Maryland',
//   'Massachusetts',
//   'Michigan',
//   'Minnesota',
//   'Mississippi',
//   'Missouri',
//   'Montana',
//   'Nebraska',
//   'Nevada',
//   'New Hampshire',
//   'New Jersey',
//   'New Mexico',
//   'New York',
//   'North Carolina',
//   'North Dakota',
//   'Ohio',
//   'Oklahoma',
//   'Oregon',
//   'Pennsylvania',
//   'Rhode Island',
//   'South Carolina',
//   'South Dakota',
//   'Tennessee',
//   'Texas',
//   'United States (comparable to ICD-O-2)',
//   'Utah',
//   'Vermont',
//   'Virginia',
//   'Washington',
//   'West Virginia',
//   'Wisconsin',
//   'Wyoming',
// ];
// let selectedFemaleDiseases1 = [
//   'Breast', // include
//   'Colorectal', // include
//   'Kidney', //include
//   'Leukemias', //include
//   'Lung', // include
//   'Melanoma of the Skin', // include Skin
//   'Non-Hodgkin Lymphoma', //include Lymphoma
//   'Oral Cavity and Pharynx', // Oral
//   'Pancreas', //include
//   'Thyroid', //include
//   'Urinary Bladder', //include Cervix
// ];
// let maleDiseases = [
//   'All Cancer',
//   'Bladder',
//   'Brain',
//   'Colorectal',
//   'Esophagus',
//   'H Lymphoma',
//   'Kaposi Sarcoma',
//   'Kidney',
//   'Larynx',
//   'Leukemia',
//   'Liver',
//   'Lung',
//   'Mesothelioma',
//   'Mouth & Throat',
//   'Myeloma',
//   'NH Lymphoma',
//   'Pancreas',
//   'Prostate',
//   'Skin',
//   'Stomach',
//   'Testis',
//   'Thyroid',
// ];
// let femaleDisease1 = [
//   'Brain',
//   'Breast', // include
//   'Cervix',
//   'Colorectal', // include
//   'Corpus Uteri',
//   'Esophagus',
//   'Gallbladder',
//   'Kidney', //include
//   'Larynx',
//   'Leukemias', //include
//   'Liver',
//   'Lung', // include
//   'Melanoma of the Skin', // include
//   'Myeloma',
//   'Non-Hodgkin Lymphoma', //include
//   'Oral Cavity and Pharynx',
//   'Ovary',
//   'Pancreas', //include
//   'Stomach',
//   'Thyroid', //include
//   'Urinary Bladder', //include
// ];
// let femaleDisease = [
//   'All Cancer',
//   'Bladder',
//   'Brain',
//   'Cervix',
//   'Colorectal',
//   'Corpus and Uterus, NOS',
//   'Esophagus',
//   'Female Breast',
//   'Female Breast, in situ',
//   'H Lymphoma',
//   'Kaposi Sarcoma',
//   'Kidney',
//   'Larynx',
//   'Leukemia',
//   'Liver',
//   'Lung',
//   'Mesothelioma',
//   'Mouth & Throat',
//   'Myeloma',
//   'NH Lymphoma',
//   'Ovary',
//   'Pancreas',
//   'Skin',
//   'Stomach',
//   'Thyroid',
// ];
// let race = ['All Races', 'Asian', 'Black', 'Hispanic', 'Other', 'White'];
// @Resolver()
// export default class AllCancerResolver {
//   @Query(() => ProportionGenderData)
//   async getallCancerProportionMatrix(
//     @Arg('year', { nullable: true }) year: String,
//     @Arg('state', { nullable: true }) state: String,
//     @Arg('race', { nullable: true }) race: String,
//     @Arg('dataSet', { nullable: true }) dataSet: String
//   ) {
//     let maleData: any;
//     let femaleData: any;
//     let obj: any = {};
//     if (year) {
//       obj.Year = year;
//     }
//     if (state) {
//       obj.Locationabbr = state;
//     } else {
//       if (dataSet === 'Incidence') {
//         obj.Locationabbr = 'United States';
//       }
//     }
//     if (race) {
//       obj.Race = race;
//     } else {
//       obj.Race = 'All Races';
//     }
//     let objMale = {
//       ...obj,
//       Gender: 'Male',
//     };
//     let objFemale = {
//       ...obj,
//       Gender: 'Female',
//     };
//     // console.log(objMale);
//     // console.log(objFemale);
//     if (dataSet === 'Incidence') {
//       maleData = await this.getProportionByGender(objMale, true);
//       femaleData = await this.getProportionByGender(objFemale, true);
//     } else {
//       maleData = await this.getProportionByGender(objMale, false);
//       femaleData = await this.getProportionByGender(objFemale, false);
//     }
//     return {
//       maleData,
//       femaleData,
//     };
//   }
//   @Query(() => ProportionGenderData)
//   async getAllCancerTypes(
//     @Arg('year', { nullable: true }) year: String,
//     @Arg('state', { nullable: true }) state: String,
//     @Arg('race', { nullable: true }) race: String,
//     @Arg('dataSet', { nullable: true }) dataSet: String
//   ) {
//     let maleData: any;
//     let femaleData: any;
//     let obj: any = {};
//     if (year) {
//       obj.Year = year;
//     }
//     if (state) {
//       obj.Locationabbr = state;
//     }
//     // else {
//     //   if (dataSet === 'Incidence') {
//     //     obj.Locationabbr = 'United States';
//     //   }
//     // }
//     if (race) {
//       obj.Race = race;
//     } else {
//       obj.Race = 'All Races';
//     }
//     let objMale = {
//       ...obj,
//       Gender: 'Male',
//     };
//     let objFemale = {
//       ...obj,
//       Gender: 'Female',
//     };
//     if (dataSet === 'Incidence') {
//       maleData = await this.getCancerTypesByGender(objMale, true, true);
//       femaleData = await this.getCancerTypesByGender(objFemale, false, true);
//     } else {
//       maleData = await this.getCancerTypesByGender(objMale, true, false);
//       femaleData = await this.getCancerTypesByGender(objFemale, false, false);
//     }
//     return {
//       maleData,
//       femaleData,
//     };
//   }
//   @Query(() => ProportionGenderData)
//   async getAllCancerRaceData(
//     @Arg('year', { nullable: true }) year: String,
//     @Arg('state', { nullable: true }) state: String,
//     @Arg('maleDisease', { nullable: true }) maleDisease: String,
//     @Arg('femaleDisease', { nullable: true }) femaleDisease: String,
//     @Arg('dataSet', { nullable: true }) dataSet: String
//   ) {
//     let maleData: any;
//     let femaleData: any;
//     let obj: any = {};
//     if (year) {
//       obj.Year = year;
//     }
//     if (state) {
//       obj.Locationabbr = state;
//     }
//     // else {
//     //   if (dataSet === 'Incidence') {
//     //     obj.Locationabbr = 'United States';
//     //   }
//     // }
//     // if (age) {
//     //   obj.ageLabel = age;
//     // }
//     let objMale = {
//       ...obj,
//       Gender: 'Male',
//     };
//     if (maleDisease) {
//       objMale.diseaseLabelMale = maleDisease;
//     } else {
//       objMale.diseaseLabelMale = 'All Cancer';
//     }
//     let objFemale = {
//       ...obj,
//       Gender: 'Female',
//     };
//     if (femaleDisease) {
//       objFemale.diseaseLabelFemale = femaleDisease;
//     } else {
//       objFemale.diseaseLabelFemale = 'All Cancer';
//     }
//     if (dataSet === 'Incidence') {
//       maleData = await this.getRaceDataByGender(objMale, true, true);
//       femaleData = await this.getRaceDataByGender(objFemale, false, true);
//     } else {
//       maleData = await this.getRaceDataByGender(objMale, true, false);
//       femaleData = await this.getRaceDataByGender(objFemale, false, false);
//     }
//     return {
//       maleData,
//       femaleData,
//     };
//   }
//   @Query(() => ProportionGenderData)
//   async getYearBasedAggregationForAllCancer(
//     @Arg('state', { nullable: true }) state: String,
//     @Arg('race', { nullable: true }) race: String,
//     @Arg('dataSet', { nullable: true }) dataSet: String,
//     @Arg('maleDisease', { nullable: true }) maleDisease: String,
//     @Arg('femaleDisease', { nullable: true }) femaleDisease: String
//   ) {
//     let maleData: any;
//     let femaleData: any;
//     let obj: any = {};
//     if (state) {
//       obj.Locationabbr = state;
//     }
//     // else {
//     //   if (dataSet === 'Incidence') {
//     //     if (dataSet === 'Incidence') {
//     //       obj.Locationabbr = 'United States';
//     //     }
//     //   }
//     // }
//     if (race) {
//       obj.Race = race;
//     } else {
//       obj.Race = 'All Races';
//     }
//     let objMale = {
//       ...obj,
//       Gender: 'Male',
//     };
//     if (maleDisease) {
//       objMale.diseaseLabelMale = maleDisease;
//     } else {
//       objMale.diseaseLabelMale = 'All Cancer';
//     }
//     let objFemale = {
//       ...obj,
//       Gender: 'Female',
//     };
//     if (femaleDisease) {
//       objFemale.diseaseLabelFemale = femaleDisease;
//     } else {
//       objFemale.diseaseLabelFemale = 'All Cancer';
//     }
//     // console.log(objMale);
//     // console.log(objFemale);
//     if (dataSet === 'Incidence') {
//       maleData = await this.getYearData(objMale, true);
//       femaleData = await this.getYearData(objFemale, true);
//     } else {
//       maleData = await this.getYearData(objMale, false);
//       femaleData = await this.getYearData(objFemale, false);
//     }
//     return {
//       maleData,
//       femaleData,
//     };
//   }
//   @Query(() => ProportionGenderString)
//   async getStateDataForAllCancer(
//     @Arg('year', { nullable: true }) year: String,
//     @Arg('race', { nullable: true }) race: String,
//     @Arg('maleDisease', { nullable: true }) maleDisease: String,
//     @Arg('femaleDisease', { nullable: true }) femaleDisease: String,
//     @Arg('dataSet', { nullable: true }) dataSet: String
//   ) {
//     let maleData: any;
//     let femaleData: any;
//     let obj: any = {};
//     if (year) {
//       obj.Year = year;
//     }
//     if (race) {
//       obj.Race = race;
//     } else {
//       obj.Race = 'All Races';
//     }
//     // if (age) {
//     //   obj.ageLabel = age;
//     // }
//     let objMale = {
//       ...obj,
//       Gender: 'Male',
//     };
//     if (maleDisease) {
//       objMale.diseaseLabelMale = maleDisease;
//     } else {
//       objMale.diseaseLabelMale = 'All Cancer';
//     }
//     let objFemale = {
//       ...obj,
//       Gender: 'Female',
//     };
//     if (maleDisease) {
//       objFemale.diseaseLabelFemale = femaleDisease;
//     } else {
//       objFemale.diseaseLabelFemale = 'All Cancer';
//     }
//     if (dataSet === 'Incidence') {
//       maleData = await this.getStateDataByGender(objMale, true, true);
//       femaleData = await this.getStateDataByGender(objFemale, false, true);
//     } else {
//       maleData = await this.getStateDataByGender(objMale, true, false);
//       femaleData = await this.getStateDataByGender(objFemale, false, false);
//     }
//     return {
//       maleData,
//       femaleData,
//     };
//   }
//   async getStateDataByGender(obj: any, isMale: boolean, isIncident: boolean) {
//     obj.type = 'Incidence';
//     obj.Locationabbr = { $ne: 'United States' };
//     if (!isIncident) {
//       obj.type = 'Death';
//     }
//     let data: any = await AllCancerModel.aggregate([
//       {
//         $match: obj,
//       },
//       {
//         $unwind: '$Locationabbr',
//       },
//       {
//         $group: {
//           _id: '$Locationabbr',
//           fullForm: { $first: '$Locationdesc' },
//           totalPopulation: { $sum: '$PopulationInNumber' },
//           totalCount: { $sum: '$CountInNumber' },
//           totalCrudeRate: { $sum: '$CrudeRateInNumber' },
//           numerator: {
//             $sum: {
//               $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: '$_id',
//           fullForm: '$fullForm',
//           totalPopulation: '$totalPopulation',
//           totalCount: '$totalCount',
//           totalCrudeRate: '$totalCrudeRate',
//           weightedAverage: { $divide: ['$numerator', '$totalPopulation'] },
//         },
//       },
//       {
//         $sort: {
//           sort: 1,
//         },
//       },
//     ]);
//     let total = data.reduce((acc: any, d: any) => {
//       acc += d.totalCount;
//       return acc;
//     }, 0);
//     for (let i = 0; i < data.length; i++) {
//       let percentage = (100 * data[i].totalCount) / total;
//       data[i].percentage = percentage;
//     }
//     if (data.length === 0 || data.length < 5) {
//       return JSON.stringify({});
//     }
//     let forMatedData = data;
//     let returnObj: any = {};
//     let sortedArray = forMatedData.sort(
//       (data1: any, data2: any) => data1.weightedAverage - data2.weightedAverage
//     );
//     let length = sortedArray.length;
//     let t25 = Math.floor((25 / 100) * (length + 1));
//     let t50 = Math.floor((50 / 100) * (length + 1));
//     let t75 = Math.floor((75 / 100) * (length + 1));
//     let lowest = sortedArray[0];
//     let highest = sortedArray[sortedArray.length - 1];
//     for (let i = 1; i < sortedArray.length - 1; i++) {
//       returnObj[sortedArray[i]._id] = sortedArray[i];
//       if (sortedArray[t75].weightedAverage < sortedArray[i].weightedAverage) {
//         returnObj[sortedArray[i]._id].quartile = 4;
//       } else if (
//         sortedArray[t50].weightedAverage < sortedArray[i].weightedAverage &&
//         sortedArray[t75].weightedAverage <= sortedArray[i].weightedAverage
//       ) {
//         returnObj[sortedArray[i]._id].quartile = 3;
//       } else if (
//         sortedArray[t25].weightedAverage < sortedArray[i].weightedAverage &&
//         sortedArray[t50].weightedAverage <= sortedArray[i].weightedAverage
//       ) {
//         returnObj[sortedArray[i]._id].quartile = 2;
//       } else {
//         returnObj[sortedArray[i]._id].quartile = 1;
//       }
//     }
//     let returnData = {
//       quartile: {
//         0: lowest.weightedAverage,
//         25: sortedArray[t25].weightedAverage,
//         50: sortedArray[t50].weightedAverage,
//         75: sortedArray[t75].weightedAverage,
//         100: highest.weightedAverage,
//       },
//       data: returnObj,
//     };
//     // console.log(Object.keys(returnData.data));
//     // console.log(returnData.quartile);
//     return JSON.stringify(returnData);
//   }
//   async getYearData(obj: any, isIncident: boolean) {
//     obj.type = 'Incidence';
//     obj.Year = { $ne: '2015-2019' };
//     if (!isIncident) {
//       obj.type = 'Death';
//     }
//     // console.log(obj);
//     let data: any = await AllCancerModel.aggregate([
//       {
//         $match: obj,
//       },
//       {
//         $group: {
//           _id: '$Year',
//           totalPopulation: { $sum: '$PopulationInNumber' },
//           totalCount: { $sum: '$CountInNumber' },
//           totalCrudeRate: { $sum: '$CrudeRateInNumber' },
//           numerator: {
//             $sum: {
//               $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: '$_id',
//           totalPopulation: '$totalPopulation',
//           totalCount: '$totalCount',
//           totalCrudeRate: '$totalCrudeRate',
//           weightedAverage: {
//             $divide: ['$numerator', '$totalPopulation'],
//           },
//         },
//       },
//       {
//         $sort: {
//           _id: 1,
//         },
//       },
//     ]);
//     // console.log(data);
//     if (data.length === 0) {
//       return [];
//     }
//     let total = data.reduce((acc: any, d: any) => {
//       acc += d.totalCount;
//       return acc;
//     }, 0);
//     for (let i = 0; i < data.length; i++) {
//       let percentage = (100 * data[i].totalCount) / total;
//       data[i].percentage = percentage;
//     }
//     return data;
//   }
//   async getRaceDataByGender(obj: any, male: boolean, isIncident: boolean) {
//     obj.type = 'Incidence';
//     obj.Race = { $ne: 'All Races' };
//     if (!isIncident) {
//       obj.type = 'Death';
//     }
//     let data: any = await AllCancerModel.aggregate([
//       {
//         $match: obj,
//       },
//       {
//         $unwind: '$Race',
//       },
//       {
//         $group: {
//           _id: '$Race',
//           totalPopulation: { $sum: '$PopulationInNumber' },
//           totalCount: { $sum: '$CountInNumber' },
//           totalCrudeRate: { $sum: '$CrudeRateInNumber' },
//           numerator: {
//             $sum: {
//               $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: '$_id',
//           totalPopulation: '$totalPopulation',
//           totalCount: '$totalCount',
//           totalCrudeRate: '$totalCrudeRate',
//           weightedAverage: { $divide: ['$numerator', '$totalPopulation'] },
//         },
//       },
//       {
//         $sort: {
//           sort: 1,
//         },
//       },
//     ]);
//     if (data.length === 0) {
//       return [];
//     }
//     let total = data.reduce((acc: any, d: any) => {
//       acc += d.totalCount;
//       return acc;
//     }, 0);
//     for (let i = 0; i < data.length; i++) {
//       let percentage = (100 * data[i].totalCount) / total;
//       data[i].percentage = percentage;
//     }
//     return data;
//   }
//   async getCancerTypesByGender(obj: any, male: boolean, isIncident: boolean) {
//     obj.type = 'Incidence';
//     obj.Topic = { $ne: 'All Cancer' };
//     if (!isIncident) {
//       obj.type = 'Death';
//     }
//     let unwindValue = '';
//     if (obj.Gender === 'Male') {
//       unwindValue = '$diseaseLabelMale';
//     } else {
//       unwindValue = '$diseaseLabelFemale';
//     }
//     let data: any = await AllCancerModel.aggregate([
//       {
//         $match: obj,
//       },
//       {
//         $unwind: '$Topic',
//       },
//       {
//         $group: {
//           _id: '$Topic',
//           totalPopulation: { $sum: '$PopulationInNumber' },
//           totalCount: { $sum: '$CountInNumber' },
//           totalCrudeRate: { $sum: '$CrudeRateInNumber' },
//           numerator: {
//             $sum: {
//               $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: '$_id',
//           totalPopulation: '$totalPopulation',
//           totalCount: '$totalCount',
//           totalCrudeRate: '$totalCrudeRate',
//           weightedAverage: { $divide: ['$numerator', '$totalPopulation'] },
//         },
//       },
//       {
//         $sort: {
//           weightedAverage: -1,
//         },
//       },
//     ]);
//     if (data.length === 0) {
//       return [];
//     }
//     let total = data.reduce((acc: any, d: any) => {
//       acc += d.totalCount;
//       return acc;
//     }, 0);
//     let maleDisease: any[] = [];
//     let femaleDisease: any[] = [];
//     if (isIncident) {
//       maleDisease = [
//         'Colorectal',
//         'Kidney',
//         'Leukemias', // Leukemia -> Leukemias
//         'Lung',
//         'Skin',
//         'Lymphoma', // NH Lymphoma -> Lymphoma
//         'Oral', // Mouth & Throat -> Oral
//         'Pancreas',
//         'Prostate',
//         'Bladder',
//       ];
//       femaleDisease = [
//         'Breast', // Female Breast -> Breast
//         'Colorectal',
//         'Kidney',
//         'Leukemias', // Leukemia -> Leukemias
//         'Lung',
//         'Skin',
//         'Lymphoma', // NH Lymphoma -> Lymphoma
//         'Pancreas',
//         'Thyroid',
//         'Cervix',
//       ];
//     } else {
//       maleDisease = [
//         'Bladder',
//         'Brain',
//         'Colorectal',
//         'Esophagus',
//         'Leukemias', /// Leukemia -> Leukemias
//         'Liver',
//         'Lung',
//         'Lymphoma', // NH Lymphoma -> Lymphoma
//         'Pancreas',
//         'Prostate',
//       ];
//       femaleDisease = [
//         'Brain',
//         'Breast', // include
//         'Cervix',
//         'Colorectal',
//         'Leukemias', // include
//         'Liver',
//         'Lung',
//         'Lymphoma', // include
//         'Ovary',
//         'Pancreas',
//       ];
//     }
//     for (let i = 0; i < data.length; i++) {
//       if (male) {
//         if (!maleDisease.includes(data[i]._id)) {
//           data.splice(i, 1);
//           i--;
//           continue;
//         }
//       } else {
//         if (!femaleDisease.includes(data[i]._id)) {
//           data.splice(i, 1);
//           i--;
//           continue;
//         }
//       }
//       let percentage = (100 * data[i].totalCount) / total;
//       data[i].percentage = percentage;
//     }
//     data = data.sort((a: any, b: any) => a.percentage - b.percentage);
//     return data;
//   }
//   @Query(() => String)
//   async tuttrus() {
//     await AllCancerModel.updateMany(
//       {
//         diseaseLabelMale: 'Leukemias',
//         Gender: 'Male',
//       },
//       {
//         Topic: 'Leukemias',
//       }
//     );
//     await AllCancerModel.updateMany(
//       {
//         diseaseLabelFemale: 'Leukemias',
//         Gender: 'Female',
//       },
//       {
//         Topic: 'Leukemias',
//       }
//     );
//     await AllCancerModel.updateMany(
//       {
//         diseaseLabelMale: 'Lymphoma',
//         Gender: 'Male',
//       },
//       {
//         Topic: 'Lymphoma',
//       }
//     );
//     await AllCancerModel.updateMany(
//       {
//         diseaseLabelFemale: 'Lymphoma',
//         Gender: 'Female',
//       },
//       {
//         Topic: 'Lymphoma',
//       }
//     );
//     await AllCancerModel.updateMany(
//       {
//         diseaseLabelMale: 'Oral',
//         Gender: 'Male',
//       },
//       {
//         Topic: 'Oral',
//       }
//     );
//     await AllCancerModel.updateMany(
//       {
//         Gender: 'Female',
//         diseaseLabelFemale: 'Oral',
//       },
//       {
//         Topic: 'Oral',
//       }
//     );
//     await AllCancerModel.updateMany(
//       {
//         diseaseLabelFemale: 'Breast',
//         Gender: 'Female',
//       },
//       {
//         Topic: 'Breast',
//       }
//     );
//     return 'Done';
//   }
//   async getProportionByGender(obj: any, isIncident: boolean) {
//     obj.type = 'Incidence';
//     obj.Topic = 'All Cancer';
//     if (!isIncident) {
//       obj.type = 'Death';
//     }
//     let unwindValue = '';
//     if (obj.Gender === 'Male') {
//       unwindValue = '$diseaseLabelMale';
//     } else {
//       unwindValue = '$diseaseLabelFemale';
//     }
//     let maleData: any = await AllCancerModel.aggregate([
//       {
//         $match: obj,
//       },
//       {
//         $unwind: unwindValue,
//       },
//       {
//         $group: {
//           _id: unwindValue,
//           totalPopulation: { $sum: '$PopulationInNumber' },
//           totalCount: { $sum: '$CountInNumber' },
//           totalCrudeRate: { $sum: '$CrudeRateInNumber' },
//           numerator: {
//             $sum: {
//               $multiply: ['$CrudeRateInNumber', '$PopulationInNumber'],
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: '$_id',
//           totalPopulation: '$totalPopulation',
//           totalCount: '$totalCount',
//           totalCrudeRate: '$totalCrudeRate',
//           weightedAverage: { $divide: ['$numerator', '$totalPopulation'] },
//         },
//       },
//     ]);
//     if (maleData.length === 0) {
//       return [];
//     }
//     let maleTotal = maleData.reduce((acc: any, d: any) => {
//       acc += d.totalCount;
//       return acc;
//     }, 0);
//     for (let i = 0; i < maleData.length; i++) {
//       let percentage = (100 * maleData[i].totalCount) / maleTotal;
//       maleData[i].percentage = percentage;
//     }
//     return maleData;
//   }
//   @Query(() => String)
//   async newDataImport() {
//     // const data = JSON.parse(fs.readFileSync('./temp/newData.json', 'utf-8'));
//     // console.log(data.length);
//     // await NewAllCancer.deleteMany();
//     // let allData = [];
//     // for (let i = 0; i < data.length; i++) {
//     //   console.log('hello' + data[i].Count + 'HI');
//     //   console.log(data[i].Count == '~');
//     //   let obj = {
//     //     Locationdesc: data[i].Locationdesc, // done
//     //     AGE_ADJUSTED_CI_LOWER: data[i].AGE_ADJUSTED_CI_LOWER,
//     //     AGE_ADJUSTED_CI_UPPER: data[i].AGE_ADJUSTED_CI_UPPER,
//     //     CrudeRateInNumber: Number(data[i].CrudeRate), // done
//     //     Count: data[i].Count, // done
//     //     CountInNumber: 0,
//     //     type: data[i].type, // done
//     //     Population: data[i].Population, // done
//     //     PopulationInNumber: Number(data[i].Population),
//     //     Race: data[i].Race, // done
//     //     Gender: data[i].Gender, // done
//     //     SITE: data[i].SITE,
//     //     Year: data[i].Year,
//     //     CRUDE_CI_LOWER: data[i].CRUDE_CI_LOWER,
//     //     CRUDE_CI_UPPER: data[i].CRUDE_CI_UPPER,
//     //     CrudeRate: data[i].CrudeRate, // done
//     //     Locationabbr: data[i].Locationabbr, // done
//     //     Topic: data[i].Topic, // done
//     //     RACE_UI: data[i].RACE_UI,
//     //     cnt: i,
//     //     diseaseLabelMale: data[i].Gender === 'Male' ? data[i].Topic : null,
//     //     diseaseLabelFemale: data[i].Gender === 'Female' ? data[i].Topic : null,
//     //   };
//     //   console.log(i);
//     //   allData.push(obj);
//     // }
//     // await NewAllCancer.insertMany(allData);
//     let data = await NewAllCancer.find();
//     for (let i = 0; i < data.length; i++) {
//       await NewAllCancer.findOneAndUpdate(
//         { _id: data[i]._id },
//         {
//           CountInNumber: Number(data[i].Count),
//         }
//       );
//     }
//     return 'done';
//   }
// }
