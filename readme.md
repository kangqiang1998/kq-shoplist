# xd商品管理系统

## 一、功能

1. 商品列表
2. 商品新增
3. 商品编辑
4. 商品删除
5. 登录
6. 注册

## 二、使用技术

1. HTML5 + CSS3
2. JavaScript
3. jQuery
4. bootstrap
5. PHP
6. Mysql

## 三、商品接口文档

#### 展示商品列表的接口

url:  api/v1/shop/select.php

method: get

query: null

resp: {

​	code: 200,

​	body: {

​		list: [

​			{ Id, name, price, num }

​		]

​	}

}



#### 添加商品的文档

url: api/v1/shop/add.php

method: get

query: { name, price, num }

resp: {

​	code: 200,  // 200代表添加成功，201代表失败

​	body: {

​		msg: '新增商品成功，你好棒棒'    //  失败返回 '网络错误，别试了'

​	}

}



#### 编辑商品的文档

url:api/v1/shop/edit.php

method:get

query:{id ,name,price,num }

resp:{

​	code：200,
	body：{
        	msg ： '商品更新成功'
      }

}

#### 删除商品的文档

url:api/v1/shop/delete.php

method:get

query:{id}

resp:{

​	code：200,
	body：{
        	msg ： '删除成功'
      }

}

### 四、用户接口文档

#### 用户注册文档

url:api/v1/user/reg.php

method:get

query:{username,phone,password}

resp:{

​	code：200,//201:你已经注册过了;202:网络错误，注册失败
	body：{
        	msg ： '注册成功'
      }

}

#### 用户登陆文档

url:api/v1/user/login.php

method:get

query:{phone ，password}

resp:{

​	code：200,//201:你还没有注册呢，请先注册！;202:密码错误
	body：{
        	msg ： '登陆成功'
      }

}





