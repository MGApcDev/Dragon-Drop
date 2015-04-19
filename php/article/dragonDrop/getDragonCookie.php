<?php
    if (isset($_COOKIE['dragon'])) {
        echo '<div id="totalDragon" totalDragon="'.sizeof($_COOKIE['dragon']).'"></div>';
        foreach ($_COOKIE['dragon'] as $name => $value) {
            
            $value = htmlspecialchars($value);
            $array = explode('~', $value);
            $src = $array[0];
            $top = $array[1];
            $left = $array[2];
            $class = $array[3];
            echo '<img src="'.$src.'" class="'.$class.'" style="top:'.$top.'; left:'.$left.';" dragonNum="'.$name.'">';
        }
    }else{
        echo '<div id="totalDragon" totalDragon="0"></div>';
    }
?>