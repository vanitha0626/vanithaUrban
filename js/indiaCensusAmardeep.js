/*eslint-disable*/
const readline = require('readline');
const fs = require('fs');

let convert=function(year){
	
	const rl = readline.createInterface({
		input: fs.createReadStream('../inputdata/India2011.csv')
	});

	if(isNaN(year))
	{
		throw new Error('Not a number');
	}

	let final=[];
	let count=0;

	rl.on('line', (line) => {
		let arr=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

		if(arr[4]==="Total" && arr[5]!=="All ages"){
			let obj=new Object();

			if(final[count]===undefined){
				obj["AgeGroup"]=arr[5];
				obj["LiteratePerson"]=parseInt(arr[12]);
				final.push(obj);
			}else{
				final[count].LiteratePerson+=parseInt(arr[12]);
			}

			count=(count+1)%28;
		}
	});

	rl.on('close',()=>{

		let finalJSON=JSON.stringify(final);

		fs.writeFile('../outputdata/IndiaCensusAmardeep.json',finalJSON, function (err) {
			if (err) return console.log(err);
			console.log("done");
		});
	});

	return "JSON written successfully";

}

// convert(2011);

module.exports=convert;