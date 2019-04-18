const router = require('koa-router')()

router.get('/list',(ctx,next) => {
  ctx.body={
    errno:0,
    data:[{title:'标题1',content:'内容1',author:'zhangsan'}]
  }
})

module.exports = router