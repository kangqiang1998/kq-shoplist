<?php
include('../config.php');

$name = $_GET['name'];
$price = $_GET['price'];
$num = $_GET['num'];

$sql = "insert into shop (name,price,num) values ('$name',$price,$num)";

$res = mysql_query($sql);

if ($res) {
  echo json_encode(array(
    "code" => 200,
    "body" => array(
      "msg" => "新增商品成功！"
    )
  ));
} else {
  echo json_encode(array(
    "code" => 201,
    "body" => array(
      "msg" => "网络错误，别试了"
    )
  ));
}

?>