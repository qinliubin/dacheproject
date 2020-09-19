<?php
use think\facade\Route;

Route::get("index","index/index");
//Route::get("login","index/login");
Route::get("login","Login/login");
Route::get("enroll","Login/Enroll");
Route::get("userList","Login/userList");
Route::get("updatauser","Login/updatauser");
Route::get("updatesave","Login/updatesave");
Route::get("alluser","Login/alluser");
Route::get("swiper","Index/swiper");

