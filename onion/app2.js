const Koa = require('koa')
const static = require('koa-static')//静态资源
const router = require('koa-router')()//路由
const bodyparser = require('koa-bodyparser') //处理前端post传递的参数，ctx.request.body

const fs = require('fs')
const path = require('path')

let app = new Koa()

app.use(static(path.join(process.cwd(), './public')))
app.use(bodyparser()) //一定要放在路由上面
app.use(router.routes())

// app.use(router.allowedMetyhods())

//将数据库连接取过来
let query = require('./db/index')

// get(请求数据用) post(发送数据用) delete(删除数据用)    

//数据库查询人员列表
router.get('/api/userlist', async (ctx) => {
    let data = await query('select * from userList')
    ctx.body = {
        code: 1,
        data
    }
})

// 添加成员
router.post('/api/add',async(ctx)=>{
    //获取前端传递的参数
    console.log(ctx.request.body);
    let {name,sex,age}=ctx.request.body;
    if(name&&sex&&age){ //容错处理
        let data=await query('select *from userList where name=?',[name])
        console.log(data);
        if(data.legth){
            //此用户名已存在
            ctx.body={
                code:2,
                msg:"此用户名已存在"
            }
        }else{
            try{
                await query('insert into userlist (name,sex,age) value (?,?,?)',[name,sex,age])
                ctx.body={
                    code:1,
                    msg:'添加成功'
                }

            }catch(e){
                ctx.body={
                    code:0,
                    msg:e
                }
            }
        }
    }else{
       ctx.body={
           code:2,
           msg:"丢失参数"
       }
    }
})
// 删除
router.delete('/api/del',async(ctx)=>{
    let{id}=ctx.query
    if(id){
        try{
            await query('delete from userList where id=?',[id])
            ctx.body={
                code:1,
                msg:"删除成功"
            }
        }catch(e){
            ctx.body={
                code:0,
                msg:e
            }
        }
    }else{
        ctx.body={
            code:2,
            msg:"丢失参数"
        }
    }
})

//更新
router.put('/api/update',async(ctx)=>{
    let{name,sex,age,id}=ctx.request.body;
    if(name&&sex&&age&&id){
        try{
            await query('update userList set name=?,sex=?,age=? where id=?',[name,sex,age,id])
            ctx.body={
                code:1,
                msg:"更新成功"
            }
        }catch(e){
            ctx.body={
                code:0,
                msg:e
            }
        }
    }else{
        ctx.body={
            code:2,
            msg:"丢失参数"
        }
    }
})

app.listen(8082, () => {
    console.log(`8082端口开启服务成功`);

})