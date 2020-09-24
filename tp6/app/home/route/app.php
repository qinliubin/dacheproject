<?php
//引入类文件
use think\facade\Route;

//创建静态路由
Route::get('index', 'index/index');
Route::get('Login', 'Login/Login');
Route::get('zhuce', 'Login/zhuce');    //注册







