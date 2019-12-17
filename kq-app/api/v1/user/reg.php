<?php
include('../config.php');

$username = $_GET['username'];
$phone = $_GET['phone'];
$password = $_GET['password'];

$sql1 = "select * from users where phone='$phone'";
$res1 = mysql_query($sql1);
$count=mysql_num_rows($res1);


if($count!=0){
    echo json_encode(array(
        "code" => 201,
        "body" => array(
          "msg" => "你已经注册过了！"
        )
      ));
}else{  
    $sql = "insert into users (username,phone,password) values ('$username','$phone','$password')";

    $res = mysql_query($sql);
    
    if ($res) {
      echo json_encode(array(
        "code" => 200,
        "body" => array(
          "msg" => "注册成功！"
        )
      ));
    } else {
      echo json_encode(array(
        "code" => 202,
        "body" => array(
          "msg" => "网络错误，注册失败"
        )
      ));
    }  
}

?>