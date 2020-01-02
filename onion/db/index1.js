const mysql=require('mysql')
module.exports=()=>{
    //1.创建链接
    let connection=mysql.createConnection({
        host:'localhost',
        port:3306,
        user:"root",
        password:'root',
        database:'userlist' //练的是数据库
    })
    //2.连接数据库
    connection.connect((error)=>{
        if(error){
            console.log('数据库连接失败');
        }else{
            console.log("数据库链接成功");
        }
    })
    return new Promise((resolve,reject)=>{
        //查询 异步
        connection.query('select*from userList',(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
            //关闭连接
            connection.end()
        })
    })
}