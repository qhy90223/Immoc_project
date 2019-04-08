const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const xss =require('xss')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req,res) => {
    const method = req.method //GET POST
    const id = req.query.id
    //身份验证
    const loginCheck = (req) => {
        if(!req.session.username){
          return Promise.resolve(new ErrorModel('没有登录'))
        }
    }
    
    //获取博客列表
    if(method === 'GET'&&req.path==='/api/blog/list'){
        let author  = req.query.author || ""
        if(req.query.isadmin){
          const loginCheckResult = loginCheck(req)
          if(loginCheckResult){
            //未登录
            return loginCheckResult
          }
          //强制查询自己的博客
          author=req.session.username
        }
        const keyword = req.query.keyword || ""
        const result= getList(author,keyword)
        return result.then(listData => {
          return new SuccessModel(listData)
        })
        
    } 
    if(method === 'GET'&&req.path==='/api/blog/detail'){
        const result = getDetail(id)
        return result.then(data => {
          return new SuccessModel(data)
        })
    } 
    if(method === 'POST'&&req.path==='/api/blog/new'){
       //登录验证
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
          //未登录
          return loginCheckResult
        }
        req.body.author=req.session.username
        const blogData=req.body
        const  result= newBlog(blogData)
        return result.then(data => {
          return new SuccessModel(data)
        })
    } 
    if(method === 'POST'&&req.path==='/api/blog/update'){
      //登录验证
      const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
          //未登录
          return loginCheckResult
        }
        req.body.author=req.session.username
        const result =updateBlog(id,req.body)
        return result.then(res => {
          if(res){
            return new SuccessModel()
          }else{
            return new ErrorModel('更新博客失败')
          }
        })
        
    } 
    if(method ==='POST'&&req.path==='/api/blog/del'){
      //登录验证
      const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
          //未登录
          return loginCheckResult
      }
       const id=req.query.id
       const author=req.session.username
       const result= delBlog(id,author)
       return result.then(res => {
         if(res){
          return new SuccessModel()
         }else{
          return new ErrorModel('删除博客失败')
         }
        })
       
    } 

} 
module.exports=handleBlogRouter