#! /usr/bin/env node
// fs.rename(oldPath, newPath, callback)
//题目要求：11.changeName -index.js -app.js
const path=require("path")
const fs=require('fs')
// let oldName=process.argv[2]&&process.argv[2].slice(1)
// let newName=process.argv[3]&&process.argv[3].slice(1)
// let url=path.join(process.cwd(),argv)
//  fs.renameSync(oldName,newName)
let list=fs.readdirSync(path.join(process.cwd(),'dist'))
let ind=1;
list.forEach(item=>{
    // 正则判断
    if(/.js$/.test(item)){
        fs.renameSync(path.join('./dist',item),path.join('./dist',`index(${ind}).js`))
        ind++
    }
})