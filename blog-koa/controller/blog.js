const {exec}=require('../db/mysql')
const xss = require('xss')
const getList = (author,keyword) => {
    let sql =`select * from blogs where 1=1 `
    if(author){
        sql+= `and author='${author}'`
    }
    if(keyword){
        sql+=`and title like '%${keyword}%'`
    }
    sql += `order by createTime desc`
    
    return exec(sql)
}
const getDetail = (id) => {
  const sql=`select * from blogs where id = ${id}`
  return exec(sql)
    
}
const newBlog = (blogData = {}) => {
    //blogData 是一个博客对象，包含title content 属性
    
    let {title , content  , author}=blogData
    title=xss(title)
    content=xss(content)
    author=xss(author)
    const createTime=Date.now()
    const sql = `insert into blogs(title,content,createTime,author) values('${title}','${content}',${createTime},'${author}')`
    return exec(sql).then(res => {
      return res.insertId
    })
    
}
const updateBlog = ( id, blogData ={}) => {
    //id就是更新博客的id
    //blogData就是一个博客对象，包含title，content属性
    const {title,content,author} = blogData
    const sql = `update blogs set title='${title}',content='${content}' where id='${id}' and author='${author}';`
    console.log(sql);
    
    return exec(sql).then(updataData => {
      if(updataData.affectedRows>0){
        return true
      }else{
        return false
      }
    })
    
}
const delBlog = (id,author) => {
    //id删除博客的id
    const sql = `delete from blogs where id=${id} and author='${author}'`
    
    
    return exec(sql).then(delData => {
      if(delData.affectedRows>0){
        return true
      }else{
        return false
      }
    })
}
module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}