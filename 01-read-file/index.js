const fs = require('fs');
const path = require('path');

const url = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(url);
stream.on('data', function(data){
  console.log(data.toString());
});