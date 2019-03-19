const http=require('http');
const querystring =require('querystring')
const server = http.createServer((req,res) => {
    console.log(req.method)//GET
    const url = req.url
    console.log('url',url)
    req.query=querystring.parse(url.split('?')[1])
    console.log(req.query);
    
    res.end(JSON.stringify(req.query))
    
})
server.listen(8888,()=>{
    console.log('服务器在8888启动了');
    
})