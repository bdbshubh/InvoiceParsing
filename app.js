const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/************************Question 1************************
*********************THE MARCO POLO GAME*******************
***********************************************************/

app.get('/gameapi', (req, res)=> {
	const fixedLength = 1000000;
	//Error Handling
	if(req.query && req.query.hasOwnProperty('n') && parseInt(req.query.n) != NaN && req.query.n != '' && req.query.n <=fixedLength){
		
		let result = marco(req.query.n);
		res.send(result);	
	}
	else{
		res.json({apiStatus: 'Failure', error: 'Please enter query string appropriately!!'});
	}
});

function marco(n){
	let myvar = '';
	const fixedSlot = 1000; 
	let counter = 1;
	for(let i=1; i<=n; i++){ 
		if(counter > fixedSlot){
			myvar = myvar + '\n'; //To make 1000 numbers per line
			counter = 1;
		}
		if(i%4==0 && i%7==0){
			myvar = myvar + ',' + 'marcopolo';
		}
		else if(i%4==0){
			myvar = myvar + ',' + 'marco';
		}
		else if(i%7==0){
			myvar = myvar + ',' + 'polo';
		}
		else{
			if(myvar != ''){
				myvar = myvar + ','
			}
			myvar = myvar + i;
		}
		counter++;
	}
	return myvar;
}


/******************************Question 3***********************************************
************************PARSE INVOICE NUMBERS*******************************************
****************************************************************************************/

app.get('/', (req, res) => {
	res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
});

app.post('/upload', (req, res) => {
	const form = new formidable.IncomingForm();
	let fileName = '';
 
    form.uploadDir = path.join(__dirname, '/upload');
    form.on('file', (field, file) => {
    	// console.log(`field_____${field}_____`);
    	// console.log(`dile_____${file}_____`);
    	fileName = file.name;
    	fs.renameSync(file.path, path.join(form.uploadDir, file.name));
    });

    form.on('error', (err) => {
    	console.log(err);
    	return res.json({apiStatus:"Failure", error: err});
    });
    form.on('end', () => {
    	console.log("uploaded");
    	parseDigitalInvoice(path.join(__dirname, '/upload', fileName), res);
    });
    form.parse(req);
});

function parseDigitalInvoice(filePath, res) {
	// console.log("filePath>>>", filePath)
	let input = fs.readFileSync(filePath, 'utf8');
	// console.log(input);
	// console.log('***************************************************************');

	let lines = input.split('\n').filter(Boolean); // Removing empty lines and spliting each lines into array
	// console.log(lines);
	// console.log(lines.length);


	// Format: line1 + line2 + line3
	let digits = [
	    ' _ | ||_|', //0
	    '     |  |', //1
	    ' _  _||_ ', //2
	    ' _  _| _|', //3
	    '   |_|  |', //4
	    ' _ |_  _|', //5
	    ' _ |_ |_|', //6
	    ' _   |  |', //7
	    ' _ |_||_|', //8
	    ' _ |_| _|', //9, 
	]

	let result = [];

	for (let i = 0; i < lines.length; i += 3)
	{
	    let num = '';
	    
	    //For all 27 charecters in a line 
	    for (let j = 0; j < 27; j += 3)
	    {
	        let char = lines[i].substr(j, 3) + lines[i + 1].substr(j, 3) + lines[i + 2].substr(j, 3);
	        if(digits.indexOf(char) != -1){
	        	num = num +''+ digits.indexOf(char);
	        }else{
	        	 num = num+''+'?';
	        }
	        
	        
	        // console.log('********************************',(num));
	    }
	    result.push(num);
	}
	const fileData = result.reduce((a, b) => {
	    return a + '\r\n' + b;
	});
	console.log(fileData);
	// console.log(fileData.length);

	fs.writeFile(__dirname +'/output_user_story_1.txt', fileData, function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	    res.download(__dirname + '/output_user_story_1.txt', 'output.txt', function(err){
		    fs.unlink(filePath, function (err) {
			  if (err) throw err;
			  console.log('File deleted!');
			});
	        
	        fs.unlink(__dirname +'/output_user_story_1.txt', function (err) {
			  if (err) throw err;
			  console.log('File deleted!');
			});
		});
	});
}


app.listen(3000, () => {
console.log('Server listen on port 3000');
});