const Koa =require("koa")
const app=new Koa()
const path=reqire('path')
const fs=require('fs')
app.use(static(process.cwd()))
app.use(views(path.join(__dirname,"../views"),{
    extension:"ejs"
}))
app.use(async(ctx,next)=>{
    console.log(ctx.path);
    //判断当前路径是否存在
    let url=path.join(process.cwd(),ctx.path)
    if(fs.existsSync(url)){
        let list=fs.readdirSync(url)
        console.log(list)

    let fileList=list.map(item=>path.join(ctx.path,item))
        await ctx.render('index',{
            list,
            fileList
        })    
    }else{
        console.log(`此路径不存在`);
    }
})
module.exports=app;