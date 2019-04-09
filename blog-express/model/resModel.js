class BaseModal{
    constructor(data,messege){
        if(typeof data === 'string'){
          this.messege = data
            data = null
            messege =null
        }
        if(data){
            this.data = data
        }
        if(messege){
           this.messege=messege
        }
    }
}
class SuccessModel extends BaseModal{
    constructor(data,messege){
        super(data,messege)
        this.errno=0

    }
}
class ErrorModel extends BaseModal{
    constructor(data,messege){
        super(data,messege)
        this.errno=-1
    }
}
module.exports={
    SuccessModel,
    ErrorModel
}