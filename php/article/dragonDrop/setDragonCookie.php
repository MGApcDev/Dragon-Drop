<?php
    if(isset($_POST['dragonSrc'])){
        $src = $_POST['dragonSrc'];
        $class = $_POST['dragonClass'];
        $top = $_POST['dragonTop'];
        $left = $_POST['dragonLeft'];
        $num = $_POST['num'];
        echo $fullstring = $src.'~'.$top.'~'.$left.'~'.$class;
        
        if(setcookie('dragon['.$num.']',$fullstring,time()+86400, '/', $_SERVER['HTTP_HOST'], false)){
            echo ' cookie set';   
        }
    }
?>