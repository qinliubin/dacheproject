<?php

namespace app\home\controller;


use think\facade\Request;
use think\facade\Db;
use app\home\model\User;
class Login
{
// 注册
    public function zhuce(){
//        echo '1111111';
        //post/get  取值
        $tel = Request::post("params.tel");
        $smscode = Request::post("params.smscode");
        $pass = Request::post("params.pass");
        $data = ['u_acc' => $tel, 'u_pwd' => md5($pass),'u_phone'=>$tel,'u_img'=>'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLXEfnE5B4RXenX8F9Ociccnh8J8IAyJTr3EyMJW9mvnZ8Cj7zTrdd5bQJLia3vanRVicCVaqMOqjKKQ/132','u_name'=>'番茄'];
        Db::table('DD_user')->insert($data);

    }
//    登录
    public function login(){
        $acc = Request::post("params.acc");
        $pwd = Request::post("params.pwd");
        $res = Db::table('DD_user')->where([
            ['u_acc','=',$acc],
            ['u_pwd','=',md5($pwd)]
        ])->find();
      if($res){
          return json(array('code'=>'10001'));
      } else {
          return  json(array('code'=>'10002'));
      }
    }

}