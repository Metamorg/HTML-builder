const fs = require('fs');
const path = require('path');


const url = path.join(__dirname, 'secret-folder');

fs.readdir(url,{withFileTypes: true},(err, items) =>{
  if (err)
    console.log(err);
  else {
    console.log('\nCurrent directory filenames:');
    items.forEach(file => {
      if(file.isFile()){
        const fileName = path.join(url, file.name);
        const fileObj = path.parse(fileName);

        fs.stat(fileName, (err, stats) => {
          if(err){
            console.log(err);
          } else {
            console.log(fileObj.name + ' - ' + fileObj.ext.slice(1) + ' - ' + stats.size/1024 + ' kb');
          }
        });
      }
    });
  }
});
