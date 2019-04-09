var express = require('express')
var router = express.Router()
const { login }=require('../controller/user')
const {SuccessModel,ErrorModel} = require('../model/resModel')
router.post('/login',function(req,res,next){
  const {username,password} =req.body
 
        const result = login(username,password)
        return result.then(rows =>{
          if(rows.username){
            req.session.username =rows.username
            req.session.realname =rows.realname
            // set(req.sessionId,req.session)  express-session会自动同步到redis
            res.json(new SuccessModel({}))
            return
          }else{
            res.json(new ErrorModel('用户名或密码错误')) 
          }
        })
})
router.get('/login-test',(req,res,next) => {
  
  
  if(req.session.username){
    res.json({
      errno:0,
      msg:"登录成功"
    })
    return
  }
  res.json({
    errno:-1,
    msg:"未登录"
  })
})
// router.get('/session-test',(req,res,next) => {
//   const session= req.session
//   if(session.viewNum == null){
//     session.viewNum=0
//   }
//   session.viewNum++
//   res.json({
//     viewNum:session.viewNum
//   })
// })
module.exports=router