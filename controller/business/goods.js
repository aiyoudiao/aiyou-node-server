/**
 * 商业-商品管理
 * 增：新增数据
 * 删：根据条件来删除
 * 改：根据条件来修改
 * 查：查列表、根据条件查、查单条信息
 */

const { exec } = require('../../db/mysql');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

const columns = [
    "c_id ",
    "c_name ",
    "c_size",
    "c_price",
    "st_id"
];

const getShopSelectList = async param => {
    // const { pageNum = 0, pageSize = 10 } = param || {};

    let sql = `select SQL_CALC_FOUND_ROWS st_id, st_name from store `;

    sql += ` order by st_id desc`;
    const res = await exec(sql);
    const sql2 = 'select found_rows() as total';
    const res2 = await exec(sql2);
    return new SuccessModel({
        data: {
            list: res,
            total: res2[0].total,
            sql,
        },
    });
};

/**
 * 获取商品列表
 * @param {*} param
 */
const getGoodsList = async param => {
    const { pageNum = 0, pageSize = 10, c_name, c_size, c_price, st_id } = param || {};

    // select store.st_name AS "st_name",commoding.c_name AS "c_name",commoding.c_price AS "c_price" FROM db_store.store INNER JOIN db_store.commoding ON store.st_id = commoding.st_id;

    let sql = `select SQL_CALC_FOUND_ROWS store.st_id AS "st_id", commoding.c_id AS "c_id", store.st_name AS "st_name",commoding.c_name AS "c_name",commoding.c_price AS "c_price", commoding.c_size AS "c_size" from  store INNER JOIN commoding ON store.st_id = commoding.st_id `;

    if (invalid(c_name)) {
        sql += ` where c_name  like '%${c_name}%' `
        if (invalid(c_size)) {
            sql += `and c_size like '%${c_size}%' `
        }
        if (invalid(c_price)) {
            sql += `and c_price like '%${c_price}%' `
        }

        sql += ` and store.st_id = ${st_id} `
    } else if (invalid(c_size)) {
        sql += ` where c_size like '%${c_size}%' `
        if (invalid(c_name)) {
            sql += `and c_name  like '%${c_name}%' `
        }

        if (invalid(c_price)) {
            sql += `and c_price  like '%${c_price}%' `
        }

        if (invalid(st_id)) {
            sql += ` and store.st_id = ${st_id} `
        }

    } else if (invalid(c_price)) {
        sql += ` where c_price like '%${c_price}%' `
        if (invalid(c_name)) {
            sql += `and c_name  like '%${c_name}%' `
        }

        if (invalid(c_size)) {
            sql += `and c_size  like '%${c_size}%' `
        }

        if (invalid(st_id)) {
            sql += ` and store.st_id = ${st_id} `
        }
    } else {
        if (invalid(st_id)) {
            sql += ` and store.st_id = ${st_id} `
        }
    }

    sql += ` order by c_id  desc limit ${(pageNum - 1) * pageSize},${pageSize}`;
    const res = await exec(sql);
    const sql2 = 'select found_rows() as total';
    const res2 = await exec(sql2);
    return new SuccessModel({
        data: {
            list: res,
            pageNum: parseInt(pageNum),
            pageSize: parseInt(pageSize),
            total: res2[0].total,
            sql,
            param: param || {}
        },
    });
};

const deleteGoods = async param => {
    const c_id = param.c_id;
    if (!invalid(c_id)) {
        return new ErrorModel({
            message: '参数异常',
            httpCode: 200,
        });
    }
    const sql = `delete from commoding where c_id in (${c_id})`;
    let res = '';
    try {
        res = await exec(sql);
    } catch (error) {
        return new ErrorModel({
            message: '删除失败，有外键关系',
            httpCode: 200,
        });
    }

    return new SuccessModel({
        message: `成功删除${res.affectedRows}条数据`,
    });
};

const updateGoods = async shop => {
    const sql = `update commoding set c_name ='${shop.c_name}',c_size='${shop.c_size}',c_price='${shop.c_price}',st_id='${shop.st_id}' where c_id =${shop.c_id}`;
    /*  const sql2 = `update messages set targetUserIsAdmin=${user.isAdmin},targetUserName='${user.username}',targetUserAvatar='${user.avatar}' where targetUserId=${user.id}`;
     const sql3 = `update chats set username='${user.username}',userAvatar='${user.avatar}' where userId=${user.id}`; */
    // 同步执行3个异步任务

    try {
        const res = await Promise.all([
            exec(sql),
            /*     exec(sql2),
                exec(sql3), */
        ]);

        return new SuccessModel({
            message: `成功更新${res[0].affectedRows}条数据`,
        });
    } catch (error) {
        return new ErrorModel({
            message: '更新失败',
            httpCode: 200,
        });
    }
};

const insertGoods = async (param) => {
    const { c_name, c_size, c_price, st_id } = param
    const sql = `insert into commoding (c_name , c_size, c_price, st_id) values
     ('${c_name}','${c_size}', '${c_price}', '${st_id}')`
    const res = await exec(sql)
    if (res.affectedRows) {
        return new SuccessModel({
            data: { id: res.insertId },
            message: '新增成功'
        })
    } else {
        return new ErrorModel({
            message: '新增失败',
            httpCode: 200
        })
    }

}

const getGoods = async param => {
    const { c_id } = param;
    if (!invalid(c_id)) {
        return new ErrorModel({
            message: '参数异常',
            httpCode: 200,
        });
    }
    let sql = `select SQL_CALC_FOUND_ROWS store.st_id AS "st_id", commoding.c_id AS "c_id", store.st_name AS "st_name",commoding.c_name AS "c_name",commoding.c_price AS "c_price", commoding.c_size AS "c_size" from  store INNER JOIN commoding ON store.st_id = commoding.st_id`;
    sql += ` where c_id =${c_id}`;

    const res = await exec(sql);
    return new SuccessModel({
        data: res[0],
    });
};

function invalid(value) {
    return !(value === undefined || value === null || value === "");

}

module.exports = {
    getGoodsList,
    deleteGoods,
    updateGoods,
    insertGoods,
    getGoods,
    getShopSelectList
}