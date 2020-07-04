import shortid from 'shortid';

export default function getFilePathAndName(type: string) {
  const fileName = `result-${type}-${shortid.generate()}.xlsx`;
  
  return {
    fileName,
    filePath: __dirname + `/../public/workbooks/${fileName}`
  }
}