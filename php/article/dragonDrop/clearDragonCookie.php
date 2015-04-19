<?php
    if(isset($_COOKIE['dragon'])){
        foreach ($_COOKIE['dragon'] as $name => $value) {
            setcookie('dragon['.$name.']','',time()-1000, '/', $_SERVER['HTTP_HOST'], false);
        }
    }
?>