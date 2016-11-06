<?php
include 'dbconnect.php';

if (isset($_GET["get"])){
    $arr=array();
    $qwer=mysql_query("select * from `items`",$myConnect);

    while ($row=mysql_fetch_assoc($qwer))
    {
        $arr[]=$row;
    }
    echo (json_encode($arr));
}