const {handleBlobRouter} = require('./src/router/blob')
const {handleUserRouter} = require('./src/router/user')
const querystring=require('querystring')
const getPostBody= (req) => {
  let postBody=""
  const {method}=req
  let promise= new Promise((resolve,reject) => {
    if(method !== "POST"){
      resolve({})
      return
    }
    if(req.headers['content-type']!=='application/json'){
      resolve({})
      return
    }
    req.on('data',chunk => {
   
      
      postBody+=chunk
    })
    req.on('end',()=>{
      if(!postBody){
        return resolve({})
      }else{
        return resolve(JSON.parse(postBody))
      }
    })
  })
  
  
  return promise
}
const handleServer =(req,res) => {
  res.setHeader('Content-type','application/json')
  const url=req.url
  req.path=url.split('?')[0]
  req.query=querystring.parse(url.split('?')[1]) 
  getPostBody(req).then(postData => {
    req.body=postData
    
    const blobRouterResult=handleBlobRouter(req)
    if(blobRouterResult){
      blobRouterResult.then(result =>{
        res.end(JSON.stringify(result))
      })
    return
    }
    const userRouter=handleUserRouter(req)
    
    if(userRouter){
      res.end(JSON.stringify(userRouter))
      return
    }
    res.write('没有找到路由/n')
    res.end("404")
  })
  

  
}
module.exports=handleServer
