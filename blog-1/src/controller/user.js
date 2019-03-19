const { exec } = require('../db/mysql')
const loginCheck=(username,password) =>{
   
    const sql = `select username,'password' from users where username='${username}' and password='${password}'`
    console.log('sql',sql);
    
    return exec(sql).then(rows => {
      if(rows){
        return rows[0] || {}
      }
    })
   
}
module.exports={
    loginCheck
}