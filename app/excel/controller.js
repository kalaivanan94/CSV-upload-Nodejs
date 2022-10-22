import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs')

import {createUsers} from './service.js';
import {Excel} from '../model/excel.js';

export async function csvupload(req,res){
	try{
		let params = req['body'];
		let data = params['rowData'].split("\r\n").slice(1);
		let newArray = [];
		let validatedArray = [];
		let tempStr = ['Name','Email ID','Mobile','Address','Country','Status','error_log'];
		let dataArraySuccess = [];
		let dataArrayError = [];
		for(let item of data){
			let temp = item.split(",");
			let arrSuccess = [];			
			let arrError = [];			
			if(temp[1] != '' && temp[2] != ''){
				validatedArray.push({name:temp[0],email:temp[1],phone:temp[2],address:temp[3],country:temp[4],status:1,error_log:(temp[1] == '')?"Email is not available":((temp[2] == '')?"Phone Number is not available":"")});
				arrSuccess.push(temp[0],temp[1],temp[2],temp[3],temp[4],1,(temp[1] == '')?"Email is not available":((temp[2] == '')?"Phone Number is not available":""));
				dataArraySuccess.push(arrSuccess);
			}else if(temp[1] == '' || temp[2] == ''){
				arrError.push(temp[0],temp[1],temp[2],temp[3],temp[4],0,(temp[1] == '' && temp[2] == '')?"Email and Phone Number is not available":((temp[1] == '')?"Email is not available":"Phone Number is not available"));
				dataArrayError.push(arrError);
			}
			if(temp[1] != '' || temp[2] != ''){
				newArray.push({name:temp[0],email:temp[1],phone:temp[2],address:temp[3],country:temp[4],status:1,error_log:(temp[1] == '')?"Email is not available":((temp[2] == '')?"Phone Number is not available":"")})	
			}else{
				newArray.push({name:temp[0],email:temp[1],phone:temp[2],address:temp[3],country:temp[4],status:0,error_log:"Email and Phone Number is not available"})
			}		
		}
		const Sval = [tempStr].concat(dataArraySuccess).map(arr => arr.join(',')).join('\r\n');

		fs.writeFile('uploads/success.csv', Sval, err => {
			if(err) console.error(err);
			else console.log('Ok');
		});
		
		const Eval = [tempStr].concat(dataArrayError).map(arr => arr.join(',')).join('\r\n');
		fs.writeFile('uploads/error.csv', Eval, err => {
			if(err) console.error(err);
			else console.log('Ok');
		});	
		let createUSer = await createUsers(newArray).catch(error =>{
			console.log(error);
		})
		res.status(200).send({success: 1,csvData:newArray,data: "User Updated successfully"})
	}catch(e){
		res.status(200).send({success: 0,data: "User Not Updated"})
	}
}