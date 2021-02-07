export default function getFilePathAndName(type: string, fileId: string) {
  const fileName = `result-${type}-${fileId}.xlsx`;
  
  return {
    fileName,
    filePath: __dirname + `/../public/workbooks/${fileName}`
  };
}