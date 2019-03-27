
const {handleLogin} = require('../controller/user')
const querystring=require('querystring')
const {SuccessModel,ErrorModel}= require('../model/resModel')
const handleUserRouter = (req) =>{
  const {method,path}= req
  if(method=='GET'&&path==='/api/user/login'){
    return  handleLogin(req).then(result => {
      if(result.username){
        req.session.username=result.username
        req.session.realname=result.realname
        return Promise.resolve(new SuccessModel({},'登录成功'))
      }
      return Promise.resolve(new ErrorModel('用户名或密码错误'))
    })
  }
  if(method==='GET'&&path==='/api/user/login-test'){
    if(req.session){
     return Promise.resolve(new SuccessModel(req.session))
    }else{
      return Promise.resolve(new ErrorModel('没有登录'))
    }   
  }
}
module.exports={
  handleUserRouter
}