import {createRequire} from "module";
import dotenv from "dotenv";
dotenv.config();
const require = createRequire(import.meta.url);

const config = require(`./config.json`); 
export {config}
