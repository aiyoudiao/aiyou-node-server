/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-09 15:13:59
 * @LastEditTime: 2020-08-10 01:28:37
 * @LastEditors: aiyoudiao
 * @FilePath: \web-end\routes\business\goods.js
 */
const router = require('koa-router')();
const {
    getGoodsList,
    deleteGoods,
    updateGoods,
    insertGoods,
    getGoods,
    getShopSelectList
} = require('../../controller/business/goods');

router.prefix('/goods');

function handleRes(ctx, next, res) {
    if (res.status === 0) {
        ctx.body = res;
    } else {
        ctx.status = res.httpCode;
        ctx.body = res;
        // ctx.message = res.message   //本来想直接设置fetch的statusText，但是加了这句话请求就出错
    }
}

// router.get ('/getFriends', async function (ctx, next) {
//   const res = await getAllBotFriends ();
//   handleRes (ctx, next, res);
// });

router.post('/getGoodsList', async function (ctx, next) {
    const res = await getGoodsList(ctx.request.body);
    handleRes(ctx, next, res);
});

router.get('/deleteGoods', async function (ctx, next) {
    const res = await deleteGoods(ctx.query);
    handleRes(ctx, next, res);
});

router.post('/updateGoods', async function (ctx, next) {
    const res = await updateGoods(ctx.request.body);
    handleRes(ctx, next, res);
});

router.post('/insertGoods', async function (ctx, next) {
    const res = await insertGoods(ctx.request.body);
    handleRes(ctx, next, res);
});

router.get('/getGoods', async function (ctx, next) {
    const res = await getGoods(ctx.query);
    handleRes(ctx, next, res);
});

router.get('/getShopSelectList', async function (ctx, next) {
    const res = await getShopSelectList(ctx.query);
    handleRes(ctx, next, res);
});


module.exports = router;
