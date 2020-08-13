/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-04-05 21:16:19
 * @LastEditTime: 2020-08-09 22:51:37
 * @LastEditors: aiyoudiao
 * @FilePath: \web-end\routes\business\index.js
 */
const router = require('koa-router')();
const shop = require('./shop');
const goods = require('./goods');
const workers = require('./workers');

router.prefix('/business');

router.use(shop.routes(), shop.allowedMethods());

router.use(goods.routes(), goods.allowedMethods());

router.use(workers.routes(), workers.allowedMethods());

router.get('/', async ctx => {
  ctx.body = {
    name: 'business',
    path: '/',
  };
});

module.exports = router;
