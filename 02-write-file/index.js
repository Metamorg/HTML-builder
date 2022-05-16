const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit} = require('process');

const url = path.join(__dirname, 'text.txt');
const writer = fs.createWriteStream(url);



stdout.write('Для выхода нажмите Ctrl + C или введите: exit\nВведите текст: ');

stdin.on('data',data=>{
  if (data.toString().trim() == 'exit') exit();
  writer.write(data.toString());
});


process.on('exit', () => {
  stdout.write('\nЗапись в файл выполенена успешно');
});
process.on('SIGINT', exit);