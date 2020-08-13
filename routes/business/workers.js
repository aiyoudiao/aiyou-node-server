/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-09 15:13:59
 * @LastEditTime: 2020-08-10 01:28:37
 * @LastEditors: aiyoudiao
 * @FilePath: \web-end\routes\business\workers.js
 */
const router = require('koa-router')();
const {
    getWorkersList,
    deleteWorkers,
    updateWorkers,
    insertWorkers,
    getWorkers,
    getShopSelectList
} = require('../../controller/business/workers');

router.prefix('/workers');

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

router.post('/getWorkersList', async function (ctx, next) {
    const res = await getWorkersList(ctx.request.body);
    handleRes(ctx, next, res);
});

router.get('/deleteWorkers', async function (ctx, next) {
    const res = await deleteWorkers(ctx.query);
    handleRes(ctx, next, res);
});

router.post('/updateWorkers', async function (ctx, next) {
    const res = await updateWorkers(ctx.request.body);
    handleRes(ctx, next, res);
});

router.post('/insertWorkers', async function (ctx, next) {
    const res = await insertWorkers(ctx.request.body);
    handleRes(ctx, next, res);
});

router.get('/getWorkers', async function (ctx, next) {
    const res = await getWorkers(ctx.query);
    handleRes(ctx, next, res);
});

router.get('/getShopSelectList', async function (ctx, next) {
    const res = await getShopSelectList(ctx.query);
    handleRes(ctx, next, res);
});


module.exports = router;
