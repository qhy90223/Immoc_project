const http = require('http')
const serverHandle=require('../app')
const PORT  = 8888
const server = http.createServer(serverHandle)
server.listen(PORT,() => {
    console.log('服务器在8888端口启动了');
    
})