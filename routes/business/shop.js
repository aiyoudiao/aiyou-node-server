/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-09 15:13:59
 * @LastEditTime: 2020-08-09 22:02:31
 * @LastEditors: aiyoudiao
 * @FilePath: \web-end\routes\business\shop.js
 */
const router = require('koa-router')();
const {
    getShopList,
    deleteShop,
    updateShop,
    insertShop,
    getShop
} = require('../../controller/business/shop');

router.prefix('/shop');

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

router.post('/getShopList', async function (ctx, next) {
    const res = await getShopList(ctx.request.body);
    handleRes(ctx, next, res);
});

router.get('/deleteShop', async function (ctx, next) {
    const res = await deleteShop(ctx.query);
    handleRes(ctx, next, res);
});

router.post('/updateShop', async function (ctx, next) {
    const res = await updateShop(ctx.request.body);
    handleRes(ctx, next, res);
});

router.post('/insertShop', async function (ctx, next) {
    const res = await insertShop(ctx.request.body);
    handleRes(ctx, next, res);
});

router.get('/getShop', async function (ctx, next) {
    const res = await getShop(ctx.query);
    handleRes(ctx, next, res);
});


module.exports = router;
