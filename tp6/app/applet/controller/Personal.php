<?php
namespace app\applet\controller;



use app\applet\model\Order;
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
    public function order(){
        $user = new User();
        $order = new Order();
        $u_acc=$_GET['u_acc'];
        $ress = $user->Db()->where("u_acc","=",$u_acc)->column('u_id');
        $rees = $order->Db()
            ->alias('o')
            ->where("o.u_id","=",$ress[0])
            ->join('DD_driver d','o.d_id=d.d_id')
            ->join('DD_RMATION a','o.rm_id = a.rm_id')
            ->join('DD_user u','o.u_id = u.u_id')
            ->join('DD_Dictionary e','a.rm_sort = e.di_id')
            ->column('o.o_endTime,o.o_initiaPosition,o.o_destination,o.o_state,o.o_money,d.d_name,d.d_img,a.rm_plateNumber,a.rm_type,a.rm_colour,u.u_acc,e.di_name');
        if($rees == ''){
            return json_encode(array('code'=>2003,'msg'=>'查找失败'));
        }else{
            return json_encode(array('code'=>2004,'msg'=>'查找成功','data'=>$rees));
        }

    }


}

