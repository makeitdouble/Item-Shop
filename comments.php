<?php
include 'dbconnect.php';

$arr = array();
$id = $_GET['id'];
$qwer = mysql_query("SELECT * FROM `comments` WHERE itemId = $id", $myConnect);

if (mysql_num_rows($qwer) == 0) {
    $empty = array();
    print(json_encode($empty));
    exit;
}

while ($row = mysql_fetch_assoc($qwer)) {
    $arr[] = $row;
}

$newArr = array();

foreach ($arr as $a){
    $newArr[$a['replyId']][] = $a;
}

function createTree($newArr, $parent){
    $arr = array();
    foreach ($parent as $key=>$value){
        if(isset($newArr[$value['id']])){
            $value['children'] = createTree($newArr, $newArr[$value['id']]);
        }
        $arr[] = $value;
    }
    return $arr;
}

$tree = createTree($newArr, $newArr[0]);
print(json_encode($tree));

