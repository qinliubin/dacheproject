<?php


namespace app\applet\controller;

use app\applet\model\Driver;
use app\applet\model\Order;


class FALogin
{
    public function FAregister(Driver $user){
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
    public function register(Driver $user){
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
    public function login(Driver $user){
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
    public function onLoadphone(Driver $user){
        $phone=$_GET['phone'];
        $res=$user->db()->where([
            ["d_phone","=",$phone],
            ["d_IDnum",'<>',"null"],
            ["d_drive",'<>',"null"],
            ["d_driving",'<>',"null"],
        ])->find();
//        echo $res;
        if ($res==[]){
            echo json_encode(array('code'=>1001,'res'=>$res));
        }else{
            echo json_encode(array('code'=>1002,'res'=>$res));
        }
    }
    public function modifiedData(Driver $user){
        $phone=$_GET['phone'];
        $IDnum=$_GET['IDnum'];
        $drive=$_GET['drive'];
        $driving=$_GET['driving'];
        $data = ['d_IDnum' => $IDnum,
            'd_drive' => $drive,
            'd_driving' => $driving];
        $res=$user->db()
            ->where("d_phone", "=",$phone)
            ->update($data);
        if ($res>0){
            echo json_encode(array('code'=>1001,'msg'=>'填写成功'));
        }else{
            echo json_encode(array('code'=>1002,'msg'=>'填写失败'));
        }
    }
    public function personal(Driver $user){
        $acc=$_GET['acc'];
        $res=$user->db()->where([
            ["d_acc","=",$acc]
        ])->find();
        if ($res!=[]){
            echo json_encode(array('code'=>1001,'msg'=>'获取成功','data'=>$res));
        }else{
            echo json_encode(array('code'=>1002,'msg'=>'哎呀出错了！'));
        }
    }
    public function onName(Driver $user){
        $acc=$_GET['acc'];
        $name=$_GET['name'];
        $data = ['d_name' => $name];
        $res=$user->db()
            ->where("d_acc", "=",$acc)
            ->update($data);
        if ($res>0){
            echo json_encode(array('code'=>1001,'msg'=>'修改成功'));
        }else{
            echo json_encode(array('code'=>1002,'msg'=>'修改失败'));
        }
    }
    public function onPhone(Driver $user){
        $acc=$_GET['acc'];
        $phone=$_GET['phone'];
        $data = ['d_acc' => $phone,
            'd_phone' => $phone,];
        $res=$user->db()
            ->where("d_acc", "=",$acc)
            ->update($data);
        if ($res>0){
            echo json_encode(array('code'=>1001,'msg'=>'修改成功'));
        }else{
            echo json_encode(array('code'=>1002,'msg'=>'修改失败'));
        }
    }
    public function onNum(Driver $user){
        $acc=$_GET['acc'];
        $num=$_GET['num'];
        $data = ['d_IDnum' => $num];
        $res=$user->db()
            ->where("d_acc", "=",$acc)
            ->update($data);
        if ($res>0){
            echo json_encode(array('code'=>1001,'msg'=>'修改成功'));
        }else{
            echo json_encode(array('code'=>1002,'msg'=>'修改失败'));
        }
    }
    public function onDriving(Driver $user){
        $acc=$_GET['acc'];
        $driving=$_GET['driving'];
        $data = ['d_drive' => $driving];
        $res=$user->db()
            ->where("d_acc", "=",$acc)
            ->update($data);
        if ($res>0){
            echo json_encode(array('code'=>1001,'msg'=>'修改成功'));
        }else{
            echo json_encode(array('code'=>1002,'msg'=>'修改失败'));
        }
    }
    public function onYears(Driver $user){
        $acc=$_GET['acc'];
        $years=$_GET['years'];
        $data = ['d_driving' => $years];
        $res=$user->db()
            ->where("d_acc", "=",$acc)
            ->update($data);
        if ($res>0){
            echo json_encode(array('code'=>1001,'msg'=>'修改成功'));
        }else{
            echo json_encode(array('code'=>1002,'msg'=>'修改失败'));
        }
    }
    /*public function onLoadOrder(Driver $driver,Order $order){
        $acc=$_GET['acc'];
        $res=$driver&&$order->db()->where([
            ["DD_driver.d_acc","=",$acc],
            ["DD_driver.d_id","=","DD_order.d_id"],
            ["DD_order.o_state","=","进行"]
        ])->find();
        echo $res;
    }*/
    public function onLoadOrder(Driver $driver,Order $order){
        $acc=$_GET['acc'];
        $data=$driver->db()->where([
            ["d_acc","=",$acc]
        ])->find();
        $res1=$order->db()->where([
            ["d_id","=",$data['d_id']],
            ["o_state","=",'进行']
        ])->select();
        $res2=$order->db()->where([
            ["d_id","=",$data['d_id']],
            ["o_state","=",'处理']
        ])->select();
        $res3=$order->db()->where([
            ["d_id","=",$data['d_id']],
            ["o_state","=",'结束']
        ])->select();
//        dump($res1);
        if ($res1||$res2||$res3){
            echo json_encode(array('code'=>1001,'msg'=>'查询成功','data1'=>$res1,'data2'=>$res2,'data3'=>$res3));
        }else{
            echo json_encode(array('code'=>1002,'msg'=>'查询失败'));
        }

    }
}