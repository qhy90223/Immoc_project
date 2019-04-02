
const { login }=require('../controller/user')

const {SuccessModel,ErrorModel} = require('../model/resModel')
const {set} =require('../db/redis')
const  getCookieExpires = () => {
  const d=new Date()
  d.setTime(d.getTime()+24*60*60*1000)
  return d.toGMTString()
}
const handleUserRouter = (req,res) => {
    const method = req.method //GET POST
    //获取博客列表
    // if(method === 'POST'&&req.path==='/api/user/login'){
    //     const {username,password} = req.body
    //     const result = login(username,password)
    //     return result.then(rows =>{
    //       if(rows.username){
    //         return new SuccessModel('登录成功')
    //       }else{
    //         return new ErrorModel('用户名或密码错误')
    //       }
    //     })
        
    // } 
    if(method === 'POST'&&req.path==='/api/user/login'){
        const {username,password} = req.body
        const result = login(username,password)
        return result.then(rows =>{
          
          if(rows.username){
            req.session.username =rows.username
            req.session.realname =rows.realname
            set(req.sessionId,req.session)
            console.log('req.session is',req.session);
            
            return new SuccessModel({})
          }else{
            return new ErrorModel('用户名或密码错误')
          }
        })
        
    } 
    // if(method === 'GET'&&req.path === '/api/user/login-test'){
    //   console.log(req.session,'req.session1');
      
    //   if(req.session&&req.session.username){
    //     return Promise.resolve(new SuccessModel({username:req.session},'登录成功'))
    //   }
    //   return Promise.resolve(new ErrorModel('没有登录'))
    // }
    

} 
module.exports=handleUserRouter