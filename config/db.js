const env = process.env.NODE_ENV  // 环境参数
/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-04-03 09:55:22
 * @LastEditTime: 2020-08-09 16:47:18
 * @LastEditors: aiyoudiao
 * @FilePath: \web-end\config\db.js
 */
let MYSQL_CONF = null


if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'db_store',
        charset: 'utf8mb4'   //字符集一定要写，否则表情包存储不了
    }
}
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'db_store',
        charset: 'utf8mb4'   //字符集一定要写，否则表情包存储不了
    }
}
module.exports = {
    MYSQL_CONF
}

