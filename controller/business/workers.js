/**
 * 商业-商户管理
 * 增：新增数据
 * 删：根据条件来删除
 * 改：根据条件来修改
 * 查：查列表、根据条件查、查单条信息
 */

const { exec } = require('../../db/mysql');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

const columns = [
    "w_id ",
    "w_name ",
    "w_sex",
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
const getWorkersList = async param => {
    const { pageNum = 0, pageSize = 10, w_name, w_sex, st_id } = param || {};

    // select store.st_name AS "st_name",workers.w_name AS "w_name",workers.w_sex AS "w_sex" FROM db_store.store LEFT JOIN db_store.workers ON store.st_id = workers.st_id;

    let sql = `select SQL_CALC_FOUND_ROWS store.st_id AS "st_id", workers.w_id AS "w_id", store.st_name AS "st_name",workers.w_name AS "w_name",workers.w_sex AS "w_sex" from  store LEFT JOIN workers ON store.st_id = workers.st_id `;

    if (invalid(w_name)) {
        sql += ` where w_name  like '%${w_name}%' `
        if (invalid(w_sex)) {
            sql += `and w_sex like '%${w_sex}%' `
        }

        sql += ` and store.st_id = ${st_id} `
    } else if (invalid(w_sex)) {
        sql += ` where w_sex like '%${w_sex}%' `
        if (invalid(w_name)) {
            sql += `and w_name  like '%${w_name}%' `
        }

        if (invalid(st_id)) {
            sql += ` and store.st_id = ${st_id} `
        }
    } else {
        if (invalid(st_id)) {
            sql += ` and store.st_id = ${st_id} `
        }
    }

    sql += ` order by w_id  desc limit ${(pageNum - 1) * pageSize},${pageSize}`;
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

const deleteWorkers = async param => {
    const w_id = param.w_id;
    if (!invalid(w_id)) {
        return new ErrorModel({
            message: '参数异常',
            httpCode: 200,
        });
    }
    const sql = `delete from workers where w_id in (${w_id})`;
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

const updateWorkers = async shop => {
    const sql = `update workers set w_name ='${shop.w_name}',w_sex='${shop.w_sex}',st_id='${shop.st_id}' where w_id =${shop.w_id}`;
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

const insertWorkers = async (param) => {
    const { w_name, w_sex, st_id } = param
    const sql = `insert into workers (w_name ,w_sex, st_id) values
     ('${w_name}', '${w_sex}', '${st_id}')`
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

const getWorkers = async param => {
    const { w_id } = param;
    if (!invalid(w_id)) {
        return new ErrorModel({
            message: '参数异常',
            httpCode: 200,
        });
    }
    let sql = `select SQL_CALC_FOUND_ROWS store.st_id AS "st_id", workers.w_id AS "w_id", store.st_name AS "st_name",workers.w_name AS "w_name",workers.w_sex AS "w_sex" from  store LEFT JOIN workers ON store.st_id = workers.st_id`;
    sql += ` where w_id =${w_id}`;

    const res = await exec(sql);
    return new SuccessModel({
        data: res[0],
    });
};

function invalid(value) {
    return !(value === undefined || value === null || value === "");

}

module.exports = {
    getWorkersList,
    deleteWorkers,
    updateWorkers,
    insertWorkers,
    getWorkers,
    getShopSelectList
}