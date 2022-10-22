import { Sequelize } from "sequelize";
import {sequelize} from "../utils/database/connection.js";

const Excel = sequelize.define("excel",{
    userID : {
        type : Sequelize.INTEGER(10),
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    name : Sequelize.STRING(50),
    email : Sequelize.STRING(255),
    phone : Sequelize.STRING(15),
    address : Sequelize.STRING(255),
    country : Sequelize.STRING(50)
},{freezeTableName : true,timestamps: false});
export {Excel}