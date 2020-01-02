// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : 'secret',
//   database : 'my_db'
// });
 
// connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
// connection.end();
const mysql=require('mysql')
module.exports=(sql,params=[])=>{//一定记得传参
    let connection=mysql.createConnection({
        host:"localhost",
        port:3306,
        user:"root",
        password:"root",
        database:"userlist"
    })
    //连接数据库
    connection.connect((error)=>{
        if(error){
            console.log(`数据库链接失败`);
        }else{
            console.log(`数据库连接成功`);
        }
    })
    //增删改查 query(sql语句，【传参】，((error,data)=>{}))
   return new Promise((resolve,reject)=>{
       //查询
       connection.query(sql,params,(error,data)=>{
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