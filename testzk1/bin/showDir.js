#! /usr/bin/env node
const path=require("path")
const fs  = require("fs")
//  如showFiles -dist 取-后面的
let argv=process.argv[2]&&process.argv[2].slice(1)
//process.cwd（）当前node执行cli的目录 
let url=path.join(process.cwd(),argv)
//判断 
// fs.existsSync 检测文件（夹）是否存在
if(fs.existsSync(url)){
    // 判断是否是文件夹
    if(fs.statSync(url).isDirectory()){
        // 读取文件夹获得一个数组
        let list= fs.readdirSync(url)
        list.forEach(item=>{
        //path.extname() 获取文件后缀名   fs.stat() 获取文件状态信息 
        let {size}=fs.statSync(path.join(url,item))
            console.log(item,path.extname(item),size);
        })
    }
}else{
    console.log(`这不是一个文件夹`);
}
