const {
  getBlobList,
  getBlobDetail,
  newBlob,
  updateBlob,
  delBlob
} = require('../controller/blob')
const {SuccessModel,ErrorModel}=require('../model/resModel')
const handleBlobRouter=(req)=>{
  const {method,path,query}=req
  
  if(method==='GET'&&path==="/api/blog/list"){
      const {author}=req.query
      const getBlobResult=getBlobList(author)
      return getBlobResult.then((data)=>{
        if(data){
         return new SuccessModel(data)
        }else{
          return new ErrorModel(data)
        }
      })
  }
  if(method==='GET'&&path==="/api/blog/detail"){
    const id=query.id
    const getBlobDetailResult=getBlobDetail(id)
    return getBlobDetailResult.then((data) => {
      if(data){
        return new SuccessModel(data)
      }else{
        return new ErrorModel(data)
      }
    })
  }
  if(method==='POST'&&path==="/api/blog/new"){
    const newBlobResult = newBlob(req.body)
    return newBlobResult.then((data)=>{
      if(data.affectedRows==1){
        return new SuccessModel(true,'新建成功')
      }
     })
  }
  if(method==='POST'&&path==="/api/blog/update"){
    const id=query.id
    
    
    const updateBlobResult = updateBlob(id,req.body)
    return updateBlobResult.then(data => {
      if(data.affectedRows==1){
        return new SuccessModel(true,'更新成功')
      }
    })
   }
  if(method==='GET'&&path==="/api/blog/del"){
    const id=query.id
    const delBlobResult=delBlob(id)
    return delBlobResult.then(data => {
      if(data.affectedRows){
        return new SuccessModel(true,'删除成功')
      }else{
        return new ErrorModel('删除失败')
      }
    })
  }
  
} 
module.exports={
  handleBlobRouter
}
