#! /usr/bin/env ndoe
const Koa = require('koa')

const app = new Koa()

const fs = require('fs')
const path = require('path')

app.use(async (ctx, next) => {
    console.log(`第一个中间件`);
    let start = new Date().getTime();
    ctx.body = 123;
    await next()
    console.log(`第一个中间件结束`);
    let end = new Date() * 1;
    let time = end - start
    fs.appendFileSync( './.log', `${ctx.url}-${ctx.method}-${ctx.status}-${time}/`)
})

let delay = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

app.use(async (ctx, next) => {
    console.log(`第二个中间件`);
    await delay()
    console.log(`第二个中间件结束`);

})


app.listen(3000, () => {
    console.log(`3000端口服务启动成功`);
})
