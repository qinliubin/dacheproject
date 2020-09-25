<?php


namespace app\applet\controller;

use app\applet\model\User;


class Login
{
    public function login(User $user){
        $u_acc=$_GET['u_acc'];
        $u_phone=$_GET['u_phone'];
        $u_name=$_GET['u_name'];
        $u_img=$_GET['u_img'];
//        echo $u_acc."|".$u_phone."|".$u_name."|".$u_img;
        $res=$user->db()->where([
            ["u_phone","=",$u_phone]
        ])->find();
        if ($res==[]){
            $data = ['u_acc' => $u_acc,
                    'u_pwd' => md5('123456'),
                    'u_phone' => $u_phone,
                    'u_name' => $u_name,
                    'u_img' =>$u_img ];
            $res2=$user->db()->insertGetId($data);
            if ($res2>0){
                echo json_encode(array('code'=>1001,'msg'=>'登录成功'));
            }else{
                echo json_encode(array('code'=>1002,'msg'=>'登录失败'));
            }

        }else{
            echo json_encode(array('code'=>1001,'msg'=>'登录成功'));
        }
    }
    public function login2(User $user){
        $u_acc=$_GET['u_acc'];
        $u_pwd=md5($_GET['u_pwd']);
        $u_phone=$_GET['u_phone'];
        $u_name=$_GET['u_name'];
        $u_img=$_GET['u_img'];
//        echo $u_acc."|".$u_phone."|".$u_name."|".$u_img;
        $res=$user->db()->where([
            ["u_phone","=",$u_phone]
        ])->find();
        if ($res==[]){
            $data = ['u_acc' => $u_acc,
                'u_pwd' => $u_pwd,
                'u_phone' => $u_phone,
                'u_name' => $u_name,
                'u_img' =>$u_img ];
            $res2=$user->db()->insertGetId($data);
            if ($res2>0){
                echo json_encode(array('code'=>1001,'msg'=>'登录成功'));
            }else{
                echo json_encode(array('code'=>1002,'msg'=>'登录失败'));
            }

        }else{
            $res3=$user->db()->where([
                ["u_acc","=",$u_acc],
                ["u_pwd","=",$u_pwd]
            ])->find();
            if ($res3==[]){
                echo json_encode(array('code'=>1002,'msg'=>'登录失败'));
            }else{
                echo json_encode(array('code'=>1001,'msg'=>'登录成功'));
            }

        }
    }
    public function userinfor(){
        echo '123';
    }
}