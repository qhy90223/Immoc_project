const fs=require('fs')
const path=require('path')


//callback 方式获取一个文件内容
function getFileContent(filename,callback){
    const fullFileName=path.resolve(__dirname,'files','a.json')
    fs.readFile(fullFileName,(err,data) => {
    if(err){
        console.log(err)
        return
    }
    callback(JSON.parse(data.toString()))
    })
}
// //测试callback
// getFileContent('a.json',(aData) => {
//     console.log('a data',aData);
//     getFileContent(aData.next,bData => {
//         console.log('b data',bData);
//         getFileContent(bData.next,cData => {
//             console.log('c data',cData);
            
//         })
//     })
    
// })
function getFileContent(filename){
    const promise = new Promise((resolve,reject)=>{
        const fullFileName=path.resolve(__dirname,'files',filename)
        fs.readFile(fullFileName,(err,data) => {
            if(err){
                reject(err)
                return
            }
            resolve(JSON.parse(data.toString()))
        })
    })
    return promise
    
}
getFileContent('a.json')
.then(aData => {
    console.log('a data',aData);
    return getFileContent(aData.next)
})
.then(bData => {
    console.log('b data',bData);
    return getFileContent(bData.next)
})
.then(cData =>{
    console.log('c data',cData);
    
})