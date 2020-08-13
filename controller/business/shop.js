/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-08 23:22:34
 * @LastEditTime: 2020-08-09 23:31:49
 * @LastEditors: aiyoudiao
 * @FilePath: \web-end\controller\business\shop.js
 */
/**
 * 商业-商店管理
 * 增：新增数据
 * 删：根据条件来删除
 * 改：根据条件来修改
 * 查：查列表、根据条件查、查单条信息
 */
const { exec } = require('../../db/mysql');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

const columns = [
  "st_id",
  "st_name",
  "st_address"
];

/**
 * 获取商店列表
 * @param {*} param
 */
const getShopList = async param => {
  const { pageNum = 0, pageSize = 10, st_name, st_address } = param || {};

  let sql = `select SQL_CALC_FOUND_ROWS ${columns.join(',')} from store `;

  if (invalid(st_name)) {
    sql += ` where st_name like '%${st_name}%' `
    if (invalid(st_address)) {
      sql += `and st_address like '%${st_address}%' `
    }
  } else if (invalid(st_address)) {
    sql += ` where st_address like '%${st_address}%' `
    if (invalid(st_name)) {
      sql += `and st_name like '%${st_name}%' `
    }
  }

  sql += ` order by st_id desc limit ${(pageNum - 1) * pageSize},${pageSize}`;
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

const deleteShop = async param => {
  const st_id = param.st_id;
  if (!invalid(st_id)) {
    return new ErrorModel({
      message: '参数异常',
      httpCode: 200,
    });
  }
  const sql = `delete from store where st_id in (${st_id})`;
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

const updateShop = async shop => {
  const sql = `update store set st_name='${shop.st_name}',st_address='${shop.st_address}' where st_id=${shop.st_id}`;
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

const insertShop = async (param) => {
  const { st_name, st_address } = param
  const sql = `insert into store (st_name, st_address) values
     ('${st_name}','${st_address}')`
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

const getShop = async param => {
  const { st_id } = param;
  if (!invalid(st_id)) {
    return new ErrorModel({
      message: '参数异常',
      httpCode: 200,
    });
  }
  let sql = `select ${columns.join(',')} from store where `;
  sql += `st_id=${st_id}`;

  const res = await exec(sql);
  return new SuccessModel({
    data: res[0],
  });
};

function invalid(value) {
  return !(value === undefined || value === null || value === "");

}

module.exports = {
  getShopList,
  deleteShop,
  updateShop,
  insertShop,
  getShop
}