<?php
include 'dbconnect.php';


if (isset($_GET["get"])) {
    $arr = array();
    $qwer = mysql_query("SELECT items.id, name, price, imageUrl, cart.quantity FROM `items`, `cart` WHERE items.id = cart.itemId", $myConnect);
    while ($row = mysql_fetch_assoc($qwer)) {
        $arr[] = $row;
    }
    echo(json_encode($arr));
}
if (isset($_GET["add"])) {
    
    $id = $_GET['id'];
    $qwer = mysql_query("select * from `cart` where itemId= $id", $myConnect);
    if (mysql_num_rows($qwer) == 0) {
        mysql_query("INSERT INTO `cart` (`itemId`, `quantity`) VALUES ($id,1)", $myConnect);
    } else {
        mysql_query("UPDATE `cart` SET `quantity` = `quantity` + 1 WHERE itemId=$id", $myConnect);
    }
}
if (isset($_GET["del"])) {
    $id = $_GET['id'];
    mysql_query("DELETE FROM `cart` WHERE itemId = $id", $myConnect);
}
if (isset($_GET["clear"])) {
    mysql_query("DELETE FROM `cart`", $myConnect);
}