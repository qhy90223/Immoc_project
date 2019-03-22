const handleBlobRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const getPostData = (req) => {
    const promise = new Promise((reslove,reject) => {
        if(req.method!=='POST'){
            reslove({})
            return
        }
        if(req.headers['content-type']!=='application/json'){
            reslove({})
            return
        }
        let postData=""
        
        req.on('data',chunk => {
            
            
            postData+= chunk
        })
        req.on('end',()=>{
            if(!postData){
                reslove({})
                return
            }
           
            
           reslove(JSON.parse(postData)) 
        })
    })
    return promise
}
const serverHandle=(req,res) => {
    //设置返回格式
    res.setHeader('Content-type','application/json')
    //获取path
    const url=req.url;
    req.path=url.split('?')[0]
    //解析query
    req.query=querystring.parse(url.split('?')[1])
    //处理 post data
    getPostData(req).then(postData => {
        req.body=postData
        //处理blob路由
        const blogResult = handleBlobRouter(req,res)
        if(blogResult){
          blogResult.then(blobData => {
             res.end(JSON.stringify(blobData))
          })
          return
        }
        
        const userResult=handleUserRouter(req,res)

        if(userResult){  
          userResult.then(userData => {
            res.end(
              JSON.stringify(userData)
            )
          })
         return
        }
        //为命中路由，返回404
        res.writeHead(404,{"Content-type":"text/plain"})
        res.write("404 not found\n")
        res.end()
    })

    
}
module.exports=serverHandle
//process.env.NODE_ENV