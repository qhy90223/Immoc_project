const {SuccessModel,ErrorModel} = require('../model/resModel')
const handleLogin = (loginInfo) => {
  const {username,password}=JSON.parse(loginInfo)

  if(username==="zhangsan"&&password===123){
    return new SuccessModel('登录成功')
  }else{
    return new ErrorModel('登录失败')
  }
}
module.exports = {
  handleLogin
}