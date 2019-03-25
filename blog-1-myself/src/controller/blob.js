

const {exec} = require('../db/mysql')
const getBlobList=(author)=>{
  if(author==='zhangsan'){
    const sql="select * from blogs where author='zhangsan';"
    return exec(sql)
  }
  
}

const getBlobDetail=(id)=>{

  const sql=`select * from blogs where id = '${id}';`
  return exec(sql)
}

const newBlob=(obj)=>{
  const author="zhangsan"
  const d= Date.now()

  
  const {title,content}=obj
  const sql=`insert into blogs (title,content,createTime,author) values ('${title}','${content}',${d},'${author}');`
  return exec(sql)
  
}

const updateBlob=(id,obj)=>{
  const sql=`update blogs set title='${obj.title}',content='${obj.content}' where id='${id}';`
  return exec(sql)
}

const delBlob=(id)=>{
  const sql=`delete from blogs where id='${id}'`
  return exec(sql)
}


  module.exports={
    getBlobList,
    getBlobDetail,
    newBlob,
    updateBlob,
    delBlob
  }