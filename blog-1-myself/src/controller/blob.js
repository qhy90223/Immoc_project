
const {SuccessModel,ErrorModel}=require('../model/resModel')
const getBlobList=(author)=>{
  if(author==='zhangsan'){
    return new SuccessModel([
      {title:"标题1",content:"内容1"},
      {title:"标题2",content:"内容2"}
    ],"获取列表成功")
  }else{
    return new ErrorModel("获取列表失败")
  }
  
}

const getBlobDetail=(id)=>{
  return {title:"标题1",content:"内容1"}
}

const newBlob=(obj)=>{
  return new SuccessModel(obj,'新建博客成功')
}

const updateBlob=(obj)=>{
  return new SuccessModel(obj,'更新博客成功')
}

const delBlob=(id)=>{
  return new SuccessModel(true,'删除博客成功')
}


  module.exports={
    getBlobList,
    getBlobDetail,
    newBlob,
    updateBlob,
    delBlob
  }