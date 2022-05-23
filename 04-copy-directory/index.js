
const path = require('path');
const { readdir, copyFile, rm, mkdir } = require('fs/promises');

const main = path.join(__dirname, 'files');
const copy  = path.join(__dirname, 'files-copy');

async function copyDir(main, copy) {
  try{
    await rm(copy, { recursive: true, force: true  });
    await mkdir(copy);
  
    await readdir(main, {withFileTypes: true},(err, items) =>{
      if(err) {
        console.log(err);
      } else {
        items.forEach(file => copyFile(path.join(main, file), path.join(copy, file)));
      }


    });

  } catch(err){
    console.error(err);
  }
}
copyDir(main, copy);