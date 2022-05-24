
const path = require('path');
const { readdir, copyFile, rm, mkdir } = require('fs/promises');

const main = path.join(__dirname, 'files');
const copy  = path.join(__dirname, 'files-copy');

async function copyDir(main, copy) {

  await rm(copy, { recursive: true, force: true  });
  await mkdir(copy);
  
  await readdir(main)
    .then((items) => {
      items.forEach(file => copyFile(path.join(main, file), path.join(copy, file)));
    });
   


}

copyDir(main, copy);