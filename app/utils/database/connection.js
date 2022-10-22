import Sequelize from "sequelize";

import {config} from "../config/config.js";
import {logger} from "../../utils/logger.js";

const sequelize = new Sequelize(config['DB_DEFAULT'],config['DB_USER'],config['DB_PASSWORD'],{host:config['DB_HOST'],dialect:"mysql",logging:false,operatorAliases:false})

sequelize.authenticate().then(()=>{
    logger.info("Mysql Connection established....");
}).catch((err)=>{
    logger.warning(`Exception during mysql connection :- ${err.message}`);
})

export {sequelize}
