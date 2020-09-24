<?php
use think\facade\Route;

Route::get("index","Index/index");
//Route::get("login","index/login");
Route::get("login","Login/Login");
Route::get("enroll","Login/Enroll");
Route::get("userList","Login/userList");
Route::get("updatauser","Login/updatauser");
Route::get("updatesave","Login/updatesave");
Route::get("allRole","Index/allRole");
Route::get("swiper","Index/swiper");
Route::get("updataRole","Index/updataRole");
Route::get("allAdmin","Index/allAdmin");
Route::get("selectRole","Index/selectRole");
