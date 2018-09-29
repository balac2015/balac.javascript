const mysql = require('mysql')

// 连接数据库
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodesql'
})

connection.connect()

// 检测是否连接成功
const test = (connection) => {
    let sql = 'SELECT 1 + 1 AS solution'

    connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error
        }

        console.log('--------------------------TEST----------------------------');
        console.log('The solution is: ', results[0].solution);
        console.log('-----------------------------------------------------------------\n\n'); 
    })
}

// 增
const insert = (connection) => {
    let  addSql = 'INSERT INTO websites(id,name,url,alexa,country) VALUES(0,?,?,?,?)';
    let  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];

    connection.query(addSql, addSqlParams, (err, result) => {
        if(err){
            return console.log('[INSERT ERROR] - ',err.message);
        }        
    
        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:',result);        
        console.log('-----------------------------------------------------------------\n\n'); 
    })
}

// 查
const select = (connection) => {
    const sql = 'SELECT * FROM websites'
    
    connection.query(sql, (err, result) => {
        if (err) {
            return console.log('[SELECT ERROR]', err.message);
        }
    
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n'); 
    })
}

// 改
const update = (connection) => {
    var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
    var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',1];

    connection.query(modSql, modSqlParams, (err, result) => {
        if (err) {
            return console.log('[UPDATE ERROR] - ',err.message)
        }

        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows: %o, result: %o',result.affectedRows, result);
        console.log('-----------------------------------------------------------------\n\n');
    })
}

// 删
const remove = (connection) => {
    const delSql = 'DELETE FROM websites where id=6'

    connection.query(delSql, (err, result) => {
        if (err) {
            return console.log('[DELETE ERROR] - ', err.message)
        }

        console.log('--------------------------DELETE----------------------------');
        console.log('DELETE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n'); 
    })
}

update(connection)
connection.end()