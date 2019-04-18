const { exec,escape} = require('../db/mysql')
const {genPassword} = require('../utils/cryp')
const login=(username,password) =>{
    username=escape(username)
    //加密
    password=genPassword(password)
    //防止sql注入
    password=escape(password)
    
    const sql = `select * from users where username=${username} and password=${password}`
    console.log(sql,'sql');
    
    return exec(sql).then(rows => {
      return Promise.resolve(rows[0]||"")
    })
   
}
const register = (username,password,realname) => {
    username=escape(username)
    //加密
    password=genPassword(password)
    //防止sql注入
    password=escape(password)
    realname=escape(realname)
  const sql = `insert into users (username,password,realname) values (${username},${password},${realname});`
  return exec(sql)
  
}
const registerCheck = (username) => {
  const sql = `select * from users where username='${username}'`
  return exec(sql)
}
module.exports={
    login,
    register,
    registerCheck
}