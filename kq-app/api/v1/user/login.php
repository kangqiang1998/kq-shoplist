<?php
include('../config.php');

$phone = $_GET['phone'];
$password = $_GET['password'];

$sql = "select * from users where phone='$phone'";
$res = mysql_query($sql);
$count=mysql_num_rows($res);

$list = array();
// 通过循环去资源里抓取数据，每取一行，都是一个$row，取完了循环也就结束了
while ($row = mysql_fetch_assoc($res)) {
  array_push($list, $row);
}

if($count!=0){
    if($list[0]['password']==$password){
        echo json_encode(array(
            "code" => 200,
            "body" => array(
              "msg" =>"登陆成功",
              "user"=>$list[0]
            )
          ));
    }else{
    echo json_encode(array(
        "code" => 202,
        "body" => array(
          "msg" =>"密码错误"
        )
      ));
    }
}else{  
    echo json_encode(array(
        "code" => 201,
        "body" => array(
          "msg" => "你还没有注册呢，请先注册！"
        )
      ));
}

?>