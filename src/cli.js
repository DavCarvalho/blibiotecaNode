import chalk from "chalk";
import fs from 'fs';
import {validatedList }  from "./http-validation.js";
import catchFiles from "./index.js";
const path = process.argv;

async function printList(validated,result, i = ''){
  if(validated){
    console.log(
      chalk.yellow('lista de links'), 
      chalk.black.bgGreen(i),
      await validatedList(result)
    );
  } else {
    console.log(
      chalk.yellow('lista de links'),
      chalk.black.bgGreen(i), 
      result
    );
  }
}

async function processText(argv){
  const path =  argv[2];
  const validated = argv[3] === '--valida';

  try {
    fs.lstatSync(path);
  } catch(error){
    if(error.code === 'ENOENT'){
      console.log('file or directory no exist');
      return
    }
  }

  if(fs.lstatSync(path).isFile()){
    const result = await catchFiles(path);
   printList(validated,result)
  } else if(fs.lstatSync(path).isDirectory()){
    const files = await fs.promises.readdir(path);
    files.forEach(async (nameFile) => {
      const list = await catchFiles(`${path}/${nameFile}`);
      printList(validated,list, nameFile)
    })

    console.log(files)
  }
}


processText(path);