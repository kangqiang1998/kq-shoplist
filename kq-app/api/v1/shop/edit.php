<?php
  include('../config.php');

  $id = $_GET['id'];
  $name = $_GET['name'];
  $price = $_GET['price'];
  $num = $_GET['num'];

  $sql = "update shop set name='$name',price=$price,num=$num where Id=$id";

  $res = mysql_query($sql);

  if ($res) {
    echo json_encode(array(
      "code" => 200,
      "body" => array(
        "msg" => '商品更新成功'
      )
    ));
  } else {
    echo json_encode(array(
      "code" => 201,
      "body" => array(
        "msg" => '网络错误，请重试'
      )
    ));
  }

  
?>