
const { loginCheck }=require('../controller/user')

const {SuccessModel,ErrorModel} = require('../model/resModel')
const handleUserRouter = (req,res) => {
    const method = req.method //GET POST
    //获取博客列表
    if(method === 'POST'&&req.path==='/api/user/login'){
        const {username,password} = req.body
        const result = loginCheck(username,password)
        return result.then(rows =>{
          if(rows.username){
            return new SuccessModel('登录成功')
          }else{
            return new ErrorModel('用户名或密码错误')
          }
        })
        
    } 
    

} 
module.exports=handleUserRouter