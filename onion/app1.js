const Koa=require('koa')
const static=require('koa-static')
const Router=require('koa-router')

const fs=require('fs')
const path=require('path')

let app=new Koa()
let router=new Router()

app.use(static(path.join(process.cwd(),'public')))
app.use(router.routes())
app.use(router.allowedMethods())


let query=require('./db/index1')
router.get('/userlist',async(ctx,next)=>{
    let data=await query()
    console.log(data)
    ctx.body={
        code:1,
        data
    }
})
app.listen(8081,()=>{
    console.log(`8081端口服务开启`);
})