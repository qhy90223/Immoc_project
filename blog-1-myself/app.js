const {handleBlobRouter} = require('./src/router/blob')
const {handleUserRouter} = require('./src/router/user')
const querystring=require('querystring')
const SESSION_DATA={}
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime()+24*60*60)
  return d.toGMTString()
}
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
  //解析path和query
  const url=req.url
  req.path=url.split('?')[0]
  req.query=querystring.parse(url.split('?')[1]) 
  //解析cookie
  req.cookie={}
  if(req.headers.cookie){
    req.headers.cookie.split(';').forEach(item => {
      const arr=item.split('=')
      req.cookie[arr[0].trim()]=arr[1].trim()
    });
  }
  //设置session
  req.session={}
  let needSetCookie=false;
  let {userId}=req.cookie;
  if(userId){
    if(!SESSION_DATA[userId]){
      SESSION_DATA[userId]={}
    }
  }else{
    userId=`${Date.now()}_${Math.random()}`
    SESSION_DATA[userId]={}
    needSetCookie=true
  }
  req.session=SESSION_DATA[userId]
  
  
  getPostBody(req).then(postData => {
    req.body=postData
    
    const blobRouterResult=handleBlobRouter(req)
    if(blobRouterResult){
      blobRouterResult.then(result =>{
        if(needSetCookie){
          res.setHeader('Set-Cookie',`userId=${userId};Path=/;httpOnly;expires=${getCookieExpires()}`)
        }
        
        res.end(JSON.stringify(result))
      })
    return
    }
    const userRouterResult=handleUserRouter(req)
    if(userRouterResult){
      userRouterResult.then(data => {
        if(needSetCookie){
          res.setHeader('Set-Cookie',`userId=${userId};Path=/;httpOnly;expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(data))
      })
      return
    }
    res.write('没有找到路由/n')
    res.end("404")
  })
  

  
}
module.exports=handleServer
