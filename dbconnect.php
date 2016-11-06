<?php
$dbHost = "127.0.0.1";
$dbUser = "root";
$dbPass = "";
$myConnect = mysql_connect($dbHost,$dbUser,$dbPass);
mysql_select_db("shop",$myConnect);