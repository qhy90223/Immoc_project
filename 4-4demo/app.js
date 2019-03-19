const http=require('http');
const querystring=require('querystring')
const server = http.createServer((req,res) => {
    const method=req.method
    const url=req.url
    const query=querystring.parse(url.split('?')[1])
    const path=url.split('?')[0]
    //设置返回格式为JSON
    res.setHeader('Content-type','application/json')
    //返回的数据
    const resData={
        method,
        url,
        path,
        query
    }
    if(method==='GET'){
        res.end(
            JSON.stringify(resData)
        )
    }
   
    
    if(method==='POST'){
        
        let postData=""
        req.on('data',chunk => {
            console.log('进来了');
            console.log(postData);
            
            postData += chunk.toString()
        })
        req.on('end',() => {
            resData.postData=postData
            res.end(
                JSON.stringify(resData)
            )
        })
    }
})
server.listen(8888,() => {
    console.log('服务器在8888启动了');
    
})