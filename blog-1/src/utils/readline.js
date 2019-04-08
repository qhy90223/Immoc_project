const fs=require('fs')
const path=require('path')
const readline=require('readline')
const fileName=path.join(__dirname,'../','../','logs','access.log')
//创建readStream
const readStream = fs.createReadStream(fileName)
//创建readLine对象
const rl=readline.createInterface({
  input:readStream
})
let chromeNum=0
let sum =0
rl.on('line',lineData =>{
  if(!lineData){
    return
  }
  sum++
  const arr = lineData.split('--')
  console.log(arr[2]);
  
  if(arr[2]&&arr[2].indexOf('Chrome')>0){
    chromeNum++
  }
})
rl.on('close',()=>{
  console.log('chrome占比',chromeNum,sum,chromeNum/sum*100+'%')
})