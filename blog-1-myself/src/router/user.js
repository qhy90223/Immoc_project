
const {handleLogin} = require('../controller/user')
const querystring=require('querystring')
const handleUserRouter = (req) =>{
  const {method,path,body}= req
  console.log(body,'body');
  
  if(method=='POST'&&path==='/api/user/login'){
    return  handleLogin(body)
    
  }

  
}
module.exports={
  handleUserRouter
}