const fs = require('fs')
const path=require('path')
//创建写入流对象函数
function createWriteStream(name){
  const fileName=path.join(__dirname,'../','../','logs',name)
  const writeStream = fs.createWriteStream(fileName,{
    flags:'a'
  })
  return writeStream
}

//创建对象流对象
const accessWriteStream = createWriteStream('access.log')
const eventsWriteStream = createWriteStream('events.log')
const errorWriteStream = createWriteStream('error.log')
//创建日志写入内容函数
function writeLog(writeStreamObj,log){
  writeStreamObj.write(log+'\n')
}
//输出入职函数
const access = (log) => {
  return writeLog(accessWriteStream,log)
}
const events = (log) => {
  return writeLog(eventsWriteStream,log)
}
const error = (log) => {
  return writeLog(errorWriteStream,log)
}
module.exports={
  access,
  events,
  error
}

