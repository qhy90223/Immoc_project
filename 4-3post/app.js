const http=require('http')
const server=http.createServer((req,res) => {
    if(req.method==='POST'){
        //req 数据格式
        console.log('req content-type',req.headers['content-type']);
        let postData=''
        req.on('data',chunk => {
            postData+= chunk.toString()
        })
        req.on('end',() => {
            console.log('postData',postData);
            res.end('hello world')
            
        })
    }
})
server.listen(8888,() => {
    console.log('8888启动');
    
})