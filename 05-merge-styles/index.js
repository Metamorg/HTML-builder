const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const writableStream = fs.createWriteStream(bundlePath);

fs.readdir(stylesPath,(err, files) => {
  files.forEach(file => {
    if(err){
      console.log(err);
    } else {
      const filePath = path.join(stylesPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log(err);
        } else {
          if (stats.isFile() && path.extname(filePath) === '.css') {
            const readableStream = fs.createReadStream(filePath, 'utf-8');
            readableStream.pipe(writableStream);
          }
        }
      });
    }
  });
});