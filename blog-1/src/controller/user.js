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
module.exports={
    login
}