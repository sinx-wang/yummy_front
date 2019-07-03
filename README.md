# yummy_front

基于react的yummy前端部分

## Go to your file project

1. Install node modules:

    ```shell
    npm install
    ```

2. Run

    ```shell
    npm start
    ```

## 流程

### 用户

登录 -> 编辑信息 -> 挑选餐厅 -> 挑选餐品 -> 付款 -> 查看订单 -> 订单操作

### 商家

登录 -> 编辑信息 -> 编辑餐品 -> 订餐操作

### 管理员

之后待定

## 接口

### 用户接口

1. 登录

    ```json
    path = "/user/verify"
    data = {
        email: "",
        password: ""
    }
    ```

2. 编辑信息

    ```json
    //得到信息
    path = "/user/getProfile"
    data = {
        email: ""
    }
    //设置信息
    path = "/user/setProfile"
    data = {
        email: "",
        uname: "",
        uphone: ""
    }
    // 得到地址
    path = "/user/getAddresses"
    data = {
        email: ""
    }
    // 删除地址
    path = "/user/deleteAddress"
    data = {
        addrId: ""
    }
    ```

3. 挑选餐厅

    ```json
    //得到餐厅
    path = "/merchant/getMerchants"
    data = {
        time: "",
        type: ""
    }
    ```

4. 挑选餐品

    ```json
    //得到食物
    path = "/merchant/getFoods"
    data = {
        merId: "",
        isSingle: ""
    }
    // 下单
    path = "/order/orderFood"
    data = {
        userEmail: "",
        merId: "",
        foodId: "",
        foodNum: ""
    }
    ```
