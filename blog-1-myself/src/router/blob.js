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
      console.log(getBlobResult,'getBlobResult');
      
      return getBlobResult.then((data)=>{
        console.log(data,'data');
        
        if(data){
         return new SuccessModel(JSON.parse(data))
        }else{
          return new ErrorModel(data)
        }
      })
  }
  if(method==='GET'&&path==="/api/blog/detail"){
    const id=query.id
    return getBlobDetail(id)
  }
  if(method==='POST'&&path==="/api/blog/new"){
    return newBlob({a:3,b:4})
  }
  if(method==='POST'&&path==="/api/blog/update"){
    return updateBlob({a:5,b:7})
  }
  if(method==='GET'&&path==="/api/blog/del"){
    const id=query.id
    return delBlob(id)
  }
  
} 
module.exports={
  handleBlobRouter
}