#! /usr/bin/env node
// 返回值是数组,[node.exe所在绝对路径,执行js文件所在的绝对路径,参数...]
// process.argv[2]=1;
let {version}=require('./package.json')

console.log("你好",process.argv);
  