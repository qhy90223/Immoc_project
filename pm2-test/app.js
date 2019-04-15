const http =require('http')
let num=0
const server = http.createServer((req,res) => {
  if(req.url.indexOf('/favicon')>-1){
    //模拟日志
    console.log('模拟日志',Date.now())
   //错误日志
    console.error('错误日志',Date.now());
  }
  
  res.setHeader('Content-type','application/json')
  res.end(
    JSON.stringify('this is PM2 server 3')
  )
})
server.listen(8000)