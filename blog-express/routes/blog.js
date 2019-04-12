const express=require('express')
const router = express.Router()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const loginCheck=require('../middleware/loginCheck')
const xss =require('xss')
const {SuccessModel,ErrorModel} = require('../model/resModel')
router.get('/list',(req,res,next) => {
        let author  = req.query.author || ""
        
        if(req.query.isadmin){
          console.log('is admin')
          if(!req.session.username){
            res.json(new ErrorModel('尚未登录'))
            return
          }
          //强制查询自己的博客
          author=req.session.username
        }
        const keyword = req.query.keyword || ""
        const result= getList(author,keyword)
        return result.then(listData => {
          res.json(new SuccessModel(listData)) 
        })
        
})
router.get('/detail',function(req,res,next){
  const id=req.query.id
  if(!id){
    return res.json({
      errno:-1,
      msg:"url格式错误"
    })
  }
  const result = getDetail(id)
  return result.then(data => {
    res.json(new SuccessModel(data)) 
  })
})
router.post('/new',loginCheck,(req,res,next) => {
    req.body.author=req.session.username
    const blogData=req.body
    const result= newBlog(blogData)
    return result.then(data => {
       res.json(new SuccessModel(data))
    })
})
router.post('/update',loginCheck,(req,res,next) => {
    const {id}=req.query
    let blogData=req.body
    blogData.author=req.session.username
   
    
    const result= updateBlog(id,blogData)
    return result.then((data) => {
      res.json(new SuccessModel(data))
    })
})
router.post('/del',loginCheck,(req,res,next) => {
  const id=req.query.id
  const author=req.session.username
  const delResult=delBlog(id,author)
  delResult.then((result) => {
    if(result){
      res.json(new SuccessModel())
    }else{
      res.json(new ErrorModel('删除博客失败'))
    }
    
  })
})
module.exports=router