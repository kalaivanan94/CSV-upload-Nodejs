import {Excel} from "../model/excel.js";

export function createUsers(params){
    return Excel.bulkCreate(params)
}