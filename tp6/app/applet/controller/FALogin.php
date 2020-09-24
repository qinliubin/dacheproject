<?php


namespace app\applet\controller;

use app\applet\model\FAUser;

class FALogin
{
    public function FAregister(FAUser $user){
        $phone=$_GET['phone'];
        $res=$user->db()->where([
            ["d_phone","=",$phone]
        ])->find();
        if ($res==[]){
            echo json_encode(array('code'=>1002));
        }else{
            echo json_encode(array('code'=>1001,'msg'=>'手机号已注册！'));
        }
    }
    public function register(FAUser $user){
        $phone=$_GET['phone'];
        $pwd=md5($_GET['pwd']);
        $data = ['d_acc' => $phone,
            'd_pwd' => $pwd,
            'd_phone' => $phone,
            'd_name' => $phone];
        $res=$user->db()->insertGetId($data);
        if ($res>0){
            echo json_encode(array('code'=>1001,'msg'=>'注册成功'));
        }else{
            echo json_encode(array('code'=>1002,'msg'=>'注册失败'));
        }
    }
    public function login(FAUser $user){
        $phone=$_GET['phone'];
        $pwd=md5($_GET['pwd']);
        $res=$user->db()->where([
            ["d_phone","=",$phone],
            ["d_pwd","=",$pwd]
        ])->find();

        if ($res==[]){
            echo json_encode(array('code'=>1002,'msg'=>'登录失败','res'=>$res));
        }else{
            echo json_encode(array('code'=>1001,'msg'=>'登录成功','res'=>$res));
        }
    }
}