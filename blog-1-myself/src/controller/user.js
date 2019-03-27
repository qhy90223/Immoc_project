const {SuccessModel,ErrorModel} = require('../model/resModel')
const {exec} = require('../db/mysql')
const handleLogin = (req) => {
  const {username,password}=req.query
  const sql = `select username,realname from users where username='${username}' and password='${password}'`
  return exec(sql).then(rows => {
    return Promise.resolve(rows[0]||"")
   })
  
}
module.exports = {
  handleLogin
}