//获取操作对象
var row = document.querySelector('.infinite-scroll');
var pagination1 = document.querySelector('.pagination');
(async function() {
    var dt = await promiseAjax({
            url: '../php/list.php',
            datatype: 'json'
        })
        //创建分页器对象
    new Pagination(pagination1, {
        pageInfo: {
            pagenum: 1,
            pagesize: 30,
            totalsize: dt.length,
            totalpage: Math.ceil(dt.length / 30)
        },
        textInfo: {
            first: '首页',
            prev: "上一页",
            next: "下一页",
            last: "尾页"
        },
        cb(m) {
            //获取当前页需要显示的数据
            var ar1 = dt.slice((m - 1) * 30, m * 30)
                //创建拼接所有数据的字符串
            var str = ''
                //遍历当前ar1数组中所有的数据
            ar1.forEach(item => {
                    str += `
                <div class="card-layout">
                            <div class="p-card">
                                <a href="../pages/xiangqing.html?id=${item.goods_id}" class="link">
                                    <div class="p-card-img-layout">
                                    <div class="p-card-img"><img src="${item.goods_small_logo}" alt=""></div>
                                        <div class="show-desc">查看详情</div>
                                    </div>
                                    <div class="p-card-desc-layout">
                                        <div class="p-card-price">
                                            <i>￥</i>${item.goods_price}元
                                        </div>
                                        <div class="p-card-location">
                                            <i class="iconfont icon-dizhi"></i> 山东济南
                                        </div>
                                        <div class="p-card-name text_ellipsis">
                                            <span style="color: rgb(51, 51, 51);">${item.goods_name}
                                        </div>
                                        <div class="p-card-tags">
                                            <div>
                                                <span class="card-tag">实地验商</span>
                                            </div>
                                            <div>
                                                <span>低温</span>
                                            </div>
                                            <div>
                                                <span>博科品牌</span>
                                            </div>
                                        </div>
                                        <div class="p-card-bottom">
                                            <span class="shop-name">
                                                <span class="name text_ellipsis">
                                                    <span>广州怡彩印刷科技有限公司</span>
                                            </span>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                `
                })
                //把当前拼接好的字符串，添加到row盒子中
            row.innerHTML = str
        }
    })
})()