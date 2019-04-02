const env=process.env.NODE_ENV//环境变量
let MYSQL_CONF 
let REDIS_CONF
if(env === 'dev'){
    MYSQL_CONF={
        host:'localhost',
        user:'root',
        password:'123456',
        port:'3306',
        database:'myblob'
    }
    REDIS_CONF={
      port:6379,
      host:'localhost',
    }
}
if(env === 'production'){
    MYSQL_CONF={
        host:'127.0.0.1',
        user:'root',
        password:'123456',
        port:'3306',
        database:'myblob'
    }
    REDIS_CONF={
      port:6379,
      host:'127.0.0.1',
    }
}
module.exports={
    MYSQL_CONF,
    REDIS_CONF
}