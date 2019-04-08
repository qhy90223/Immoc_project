const handleBlobRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const {get,set} =require('./src/db/redis')
const {access} = require('./src/utils/log')
//session数据
const  getCookieExpires = () => {
  const d=new Date()
  d.setTime(d.getTime()+24*60*60*1000)
  return d.toGMTString()
}
// const SESSION_DATA={}
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
    //记录accesslog
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${new Date()}`)
    //设置返回格式
    res.setHeader('Content-type','application/json')
    //获取path
    const url=req.url;
    req.path=url.split('?')[0]
    //解析query
    req.query=querystring.parse(url.split('?')[1])
    //解析cookie
    req.cookie={}
    const cookieStr=req.headers.cookie|| ''
    cookieStr.split(';').forEach(item => {
      if(!item){
        return
      }
      const arr =item.split('=')
      req.cookie[arr[0].trim()]=arr[1].trim()
    });
    //解析session
    // let needSetCookie=false
    // let userId=req.cookie.userid
    // if(userId){
    //   if(!SESSION_DATA[userId]){
    //     SESSION_DATA[userId]={}
    //   }
      
    // }else{
    //   needSetCookie=true
    //   userId=`${Date.now()}_${Math.random()}`
    //   SESSION_DATA[userId]={}
    // }
    // req.session=SESSION_DATA[userId]
    //初始化redis中的session
    let userId=req.cookie.userid
   
    let needSetCookie=false
    if(!userId){
      //初始化redis中的session
      needSetCookie=true
      userId=`${Date.now()}_${Math.random()}`
      set(userId,{})
    }
    req.sessionId = userId
    //获取session
    get(req.sessionId)
    .then(sessionData => {
      if(sessionData===null){
        //初始化redis中的session
        set(req.sessionId,{})
      }else{
        req.session=sessionData
      }
      return getPostData(req)
    })
    .then(postData => {
        req.body=postData
        //处理blob路由
        const blogResult = handleBlobRouter(req,res)
        if(blogResult){
          blogResult.then(blobData => {
            if(needSetCookie){
              res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
            }
            res.end(JSON.stringify(blobData))
          })
          return
        }
        const userResult=handleUserRouter(req,res)
        if(userResult){  
          userResult.then(userData => {
            if(needSetCookie){
              res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
            }
            res.end(JSON.stringify(userData))
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