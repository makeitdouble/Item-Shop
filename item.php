<?php
include 'dbconnect.php';

if (isset($_GET["get"])){
    if (isset($_GET["id"])){
        $id = $_GET["id"];
        $qwer=mysql_query("select * from `items` WHERE id = $id",$myConnect);
        echo (json_encode(mysql_fetch_assoc($qwer)));
    }else{
        $arr=array();
        $qwer=mysql_query("select * from `items`",$myConnect);

        while ($row=mysql_fetch_assoc($qwer))
        {
            $arr[]=$row;
        }
        echo (json_encode($arr));
    }
}