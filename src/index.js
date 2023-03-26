import fs from 'fs';
import chalk from 'chalk';


function handlingError(erro){
  throw new Error(chalk.red(erro.code, 'não ha arquivo'));
}

function extractLinks(text){
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const allMatchs = [...text.matchAll(regex)];
  const results = allMatchs.map(match => ({[match[1]]: match[2]}))
  return results.length !==0 ? results : 'there is no links ';
}

async function catchFiles(filePath){
  try {
    const encoding = 'utf-8'
    const text = await fs.promises.readFile(filePath, encoding)
    return extractLinks(text)
  } catch(error){
    handlingError(error)
  }
}


export default catchFiles