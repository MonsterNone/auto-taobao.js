// 手动设定部分
let number = 1 // 抢购的数量(购物车的前n个商品，只支持第一页)
// 说明：多个数量为同一时间定时抢模式，当第一件商品可以购买时全部下单(不考虑接下来几件可以购买与否);
//      一个为不断刷新捡漏模式。
// 超过第一页需要滚动，容易延误时机。如果实在是需要第二页的建议在开发者选项里修改dpi。

function launch_tb() {
    app.launchPackage("com.taobao.taobao")
    waitForActivity("com.taobao.tao.TBMainActivity")
}

function qiang() {
    // 进入购物车
    className("android.widget.FrameLayout").desc("购物车").findOne().click()
    id("recycleview_cart").waitFor()
    refresh()


    // 不断地刷新
    let checkbox = find_product()
    while (!checkbox[0].clickable()) {
        toast("无法下单，刷新")
        sleep(1000)
        refresh()
        checkbox = find_product()
    }

    // 选择
    if (checkbox.length < number) { // 如果没有搜索到指定数量的商品
        toast("需要" + number + "件商品，第一页只有" + checkbox.length + "件")
        number = checkbox.length
    }
    for (var i = 0; i < number; i++) {
        checkbox[i].click()
    }

    // 下单
    id("button_cart_charge").findOne().click()
    text("提交订单").findOne().click()

    // 刷新购物车
    function refresh() {
        swipe(500, 100, 500, 900, 200)
        className("android.widget.TextView").text("刷新完成").waitFor()
        sleep(100)
    }

    function find_product() {
        /*id("recycleview_cart").findOne().children().forEach(cart => {
            var target = cart.
            return target
        });*/
        return desc("勾选宝贝").untilFind()
    }



}

auto.waitFor()
launch_tb()
qiang()