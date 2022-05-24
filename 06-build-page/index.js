const fs = require('fs');
const path = require('path');
const { readdir, writeFile, readFile, copyFile, rm, mkdir } = require('fs/promises');

let data = '';

const distPath = path.join(__dirname, 'project-dist');

async function createFoldersAndFiles() {
  try {
    await rm(path.join(distPath), { force: true, recursive: true });
    await mkdir(path.join(distPath), { recursive: true });
    await mkdir(path.join(distPath, 'assets'), { recursive: true });
    await writeFile(path.join(distPath, 'style.css'), '');
 
    createBundle();
    copy(path.join(__dirname, 'assets'), path.join(distPath, 'assets'));
    readTemplate();
  } catch (err) {
    console.log(err);
  } 
}

createFoldersAndFiles();


async function createBundle() {
  try {
    const files = await readdir(path.join(__dirname,'styles'), {withFileTypes: true});
    for (let elem of files) {
      if (path.extname(path.join(__dirname, 'styles', elem.name)) === '.css') {
        const input = fs.createReadStream(path.join(__dirname,'styles', elem.name));
        const output = fs.createWriteStream(path.join(distPath, 'style.css'));

        input.on('data', chunk => data += chunk);
        input.on('error', error => console.log(error));
        input.on('end', function(){
          output.write(data);
        });
      }
    }
  
  } catch (err) {
    console.error(err);
  } 
}


async function copy(directory, copyDirectory) {
  try {
    const files = await readdir(path.join(directory), {withFileTypes: true});
    for (let item of files) {
      if (item.isFile()) {
        copyFile(path.join(directory,item.name), path.join(copyDirectory,item.name));
      } else {
        await mkdir(path.join(copyDirectory,item.name), { recursive: true });
        await copy(path.join(directory,item.name),path.join(copyDirectory,item.name));
      }
    }
  } catch (err) {
    console.error(err);
  } 
}

async function readTemplate() {
  try {
    let components = [];
    const files = await readdir(path.join(__dirname, 'components'), {withFileTypes: true});
    for (let item of files) {
      components.push(path.parse(path.join(__dirname, 'components', item.name)).name);
    }

    let index = await readFile(path.join(__dirname,'template.html'), 'utf-8');
    for (let item of components) {
      let html = await readFile(path.join(__dirname, 'components', `${item}.html`), 'utf-8');
      index = index.replace(`{{${item}}}`, html);
    }
    await writeFile(path.join(distPath, 'index.html'), index);

  } catch (err) {
    console.log(err);
  } 
}