/*eslint-disable*/
const rl=require('readline');
const fs=require('fs');
let convert = function convert(startYear){
	if(isNaN(startYear)){
        throw new Error('Not a number');
  	}
	let lineReader = rl.createInterface({
	  input: fs.createReadStream('../inputdata/Indicators.csv')
	});
	let objarr=[];
	lineReader.on('line', function (line) {
		let l=line;
		let linearr=l.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
		if(linearr[1]==="IND"){
			let obj={};
			if(linearr[3]==="SP.URB.TOTL.IN.ZS"){
			obj["country"]=linearr[0];
			obj["urban_pop"]=linearr[5];
			obj["year"]=linearr[4];
			objarr.push(obj);
			}
			if(linearr[3]==="SP.RUR.TOTL.ZS"){
			obj["country"]=linearr[0];
			obj["rural_pop"]=linearr[5];
			obj["year"]=linearr[4];
			objarr.push(obj);
			}
		}
	});
	let jsondata=[];
	let jsonarr=[];
	lineReader.on('close',function(){
		for (let i = 0; i <objarr.length; i=i+2) {
		if(objarr[i].year===objarr[i+1].year){
			objarr[i]["urban_pop"]=objarr[i+1].urban_pop;
			jsonarr.push(objarr[i]);
		}
	}
	console.log(typeof jsonarr);
	jsondata=JSON.stringify(jsonarr);

	fs.writeFile("../outputdata/worldDevIndicatorUrbanizationAbhishek.json",jsondata);
	//return jsondata;
	});
	return "JSON written successfully";
};

module.exports=convert;


