const redis=require('redis');
const {REDIS_CONF} = require('../conf/db')
const redisClient=redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error',err => {
  console.log(err);
  
})
function set(key,val){
  if(typeof val == 'object'){
    redisClient.set(key,JSON.stringify(val))
  }
}
function get(key){
  const promise = new Promise((resolve,reject) => {
    redisClient.get(key,(err,val) => {
      if(err){
        reject(err)
      }
      if(val===null){
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (ex) {
          resolve(val)
      }
    })
  })
  return promise
}
module.exports = {
  get,
  set
}