let port=8080;
let {version}=require('../package.json');
if(argv=="v"){
    //打印版本号
    console.log(version)
}else{
    console.log("启服务")
}