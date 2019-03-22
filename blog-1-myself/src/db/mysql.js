const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/mysqlconf')


//创建对象

const con = mysql.createConnection(MYSQL_CONF)

//开始连接

con.connect()

//同一执行sql的函数

function exec(sql){
    const promise = new Promise((resolve,reject) => {
        con.query(sql,(err,result) => {
            if(err){
              reject(err)
                return
            }
            
            
            resolve(JSON.stringify(result))
          
        })
      })
    return promise

}
module.exports={
    exec
}