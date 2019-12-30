#! /usr/bin/env node
let argv=process.argv[2]&&process.argv[2]
let {version}=require("../package.json")
let app=require('../server/index')
let port=8080
if(argv==="-v"||argv==="-V"){
    console.log(version);
}else{
    port=process.argv[3]?process.argv:port;
    app.listen(port,()=>{
        console.log(`${port}端口服务开启成功`);
    })
}