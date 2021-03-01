//获取当前地址栏中的参数信息
var search = location.search
    //获取大盒子对象
var box = document.querySelector(".panel")
var dt;
//判断当前search对象中是否有值
if (search) {
    //分割search字符串
    var id = search.split('=')[1];

    (async function() {
        dt = await promiseAjax({
                url: '../php/xiangqing.php',
                data: 'id=' + id,
                datatype: 'json'
            })
            //创建拼接所有内容的字符串
        var str = `
        <div class="panel-heading">商品详细信息</div>
        <div class="panel-body">
            <div class="media">
                <div class="media-left media-middle">
                <a href="#" class="boxx">
                    <img class="media-object" src="${dt.goods_small_logo}" alt="...">
                    <div class='mark'></div>
                </a>
                <div class='boxRight'>
                    <img src="${dt.goods_small_logo}" alt="">
                </div>
                </div>
                <div class="media-body">
                <h3 class="media-heading">${dt.goods_name}</h3>
                <h2>￥${dt.goods_price}</h2>
                <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default">XL</button>
                    <button type="button" class="btn btn-default">L</button>
                    <button type="button" class="btn btn-default">M</button>
                    <button type="button" class="btn btn-default">XM</button>
                    <button type="button" class="btn btn-default">XS</button>
                </div>
                <br/><br/>
                <a href="./cart.html" class="btn btn-info">立即购买</a>
                <a href="javascript:;" class="btn btn-success">加入购物车</a>
                <a href="./list.html" class="btn btn-primary">返回列表页</a>
                </div>
            </div>
            <ul class="nav nav-tabs">
                <li role="presentation" class="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>
            ${dt.goods_introduce}
        </div>
        `
            //把当前内容添加到大盒子中
        box.innerHTML = str;




        //获取操作对象
        var boxx = document.querySelector(".boxx")
        var mark = document.querySelector(".mark")
        var boxright = document.querySelector(".boxRight")
        var img2 = boxright.querySelector("img")
        console.log(boxx, mark, boxright, img2);
        //遮藏层移动函数
        function move1(e) {
            //获取遮罩层移动距离 
            var x1 = e.pageX - boxx.offsetLeft - parseInt(mark.offsetWidth / 2)
            var y1 = e.pageY - boxx.offsetTop - parseInt(mark.offsetHeight / 2)
            console.log(parseInt(mark.offsetWidth / 2), parseInt(mark.offsetHeight / 2));
            //设置遮藏层的边界
            var maxX = boxx.offsetWidth - mark.offsetWidth
            var maxY = boxx.offsetHeight - mark.offsetHeight
                //右边图片的移动距离
            var rightX, rightY
                //水平方向的判断，并且移动遮藏层
            if (x1 < 0) {
                mark.style.left = '0px'
                rightX = 0

            } else if (x1 > maxX) {
                mark.style.left = maxX + 'px'
                rightX = maxX
            } else {
                mark.style.left = x1 + 'px'
                rightX = x1
            }

            //垂直方向的判断
            if (y1 < 0) {
                mark.style.top = '0px'
                rightY = 0
            } else if (y1 > maxY) {
                mark.style.top = maxY + "px"
                rightY = maxY
            } else {
                mark.style.top = y1 + 'px'
                rightY = y1
            }

            //让右边的图片进行移动
            img2.style.left = -2 * rightX + 'px'
            img2.style.top = -2 * rightY + 'px'
        }
        //给box对象绑定三个事件
        boxx.onmouseover = function(e) {
            var e = e || window.event
            mark.style.display = 'block'
            boxright.style.display = 'block'
        }

        boxx.onmousemove = function(e) {
            var e = e || window.event(e)
            move1(e)
        }
        boxx.onmouseout = function() {
            mark.style.display = 'none'
            boxright.style.display = 'none'
        }
    })()

} else {
    // alert("你还没选中商品")
    // location = "./list.html"
}
//给大盒子对象绑定点击事件
box.onclick = function(e) {
    var e = e || window.event
        //获取点击对象
    var target = e.target || e.srcElement
        //判断点击的对象是否为加入购物车按钮
    if (target.innerHTML == "加入购物车") {
        //获取localStorage中的cartList3
        var cartList = localStorage.getItem("cartList3")
            //判断当前获取的cartList是否存在
        if (cartList) {
            //把localStorage中获取的内容转为数组对象
            cartList = JSON.parse(cartList)
            var a = 0 //判断当前添加的商品是否在localStorage中存在
                //遍历数组中所有元素啊
            cartList.forEach(item => {
                    //判断当前遍历的商品是否等于要添加的商品
                    if (item.goods_id == dt.goods_id) {
                        a++
                        item.cart_number++
                    }
                })
                //判断a变量是否等于0
            if (a == 0) {
                //修改商品数量
                dt.cart_number = 1
                    //把当前对象追加到数组中
                cartList.push(dt)
            }
            //把当前商品添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify(cartList))
        } else {
            //修改当前商品数量
            dt['cart_number'] = 1
                //把当前商品添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify([dt]))
        }

    }
}