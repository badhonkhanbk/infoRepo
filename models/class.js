"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    day: String,
    code: String,
    myCode: String,
    time: String,
    room: String,
    name: String,
    TI: String,
    sec: String,
    subSec: String,
    lab: {
        type: Boolean,
        default: false,
    },
});
const classSchedule = (0, mongoose_1.model)('class', classSchema);
exports.default = classSchedule;
