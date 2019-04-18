var express = require('express')
var router = express.Router()
const { login,register,registerCheck}=require('../controller/user')
const {SuccessModel,ErrorModel} = require('../model/resModel')

router.post('/login',function(req,res,next){
        let  {username,password} =req.body
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
const registerCheckResult = (req,res,next) => {
  const {username} =req.body
   result = registerCheck(username)
  result.then(data=>{
    if(data.length>0){
      res.json(
        new SuccessModel('用户已存在')
      )
    }else{
      next()
    }
  })

}
router.post('/register',registerCheckResult,(req,res,next) => {
  let {username,password,realname} = req.body
  
  const result = register(username,password,realname)
  result
  .then(rows => {
    
     if(rows.affectedRows>0){
      res.json(
        new SuccessModel('注册成功')
      )
    }else{
      res.json(
        new ErrorModel('注册失败')
      )
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