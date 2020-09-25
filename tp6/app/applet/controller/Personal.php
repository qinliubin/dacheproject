<?php
namespace app\applet\controller;



use app\applet\model\User;

class Personal
{
    public function userinfor(User $user){
        $u_acc=$_GET['u_acc'];
        $res = $user->db()->where('u_acc','=',$u_acc)->find();
//        $userinfor = json_encode($res);
        if($res == ''){
            echo json_encode(array('code'=>2001,'msg'=>'查找失败'));
//            return json(array('code'=>1001,'msg'=>'查找失败'));
        }else{
            echo json_encode(array('code'=>2002,'msg'=>'查找成功','data'=>$res));
//            return json(array('code'=>1002,'msg'=>'查找成功','data'=>"$userinfor"));
        }

    }

}

