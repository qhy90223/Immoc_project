class BaseModel {
  constructor(data,message){
    console.log(typeof data,'11111111');
    if(typeof data === 'string'){
      this.data=data
      data=null
      message=null
    }
    if(data){
      console.log('22222');
      
      this.data=data
    }
    if(message){
      this.message=message
    }
    
  }
}
class SuccessModel extends BaseModel{
  constructor(data,message){

    super(data,message)
    console.log(data,'data');
 
    this.errno=0
  }
}
class ErrorModel extends BaseModel{
  constructor(data,message){
    super(data,message)
    
    this.errno=-1
  }
}
module.exports={
  SuccessModel,
  ErrorModel
}