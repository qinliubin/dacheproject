<?php
namespace app\admin\controller;


use app\admin\model\User;
use think\facade\Db;
use think\facade\View;
use think\facade\Request;

class Passenger
{
    //打印用户表格
    public function user(){
       $User=new User();
        $res=$User->Db()->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
        return json($data);
    }
    //    查询司机
    public function Checkuser(){
        $u_phone=Request::param('u_phone');
        $User=new User();
        $res=$User->Db()->where([["u_phone","=",$u_phone]])->find();
        if ($res){
            return json(array('code'=>'30001','arry'=>$res));
        }else{
            return json(array('code'=>'30002','msg'=>'查无此人'));
        }
    }
    //    添加数据
    public function Addduser(){
        $u_acc=Request::param('u_acc');
        $u_name=Request::param('u_name');
        $u_phone=Request::param('u_phone');
        $u_IDnum=Request::param('u_IDnum');
        $u_pwd=Request::param('u_pwd');
        $User=new User();
        $res=$User->Db()->insert(['u_acc'=>$u_acc,'u_name'=>$u_name,'u_pwd'=>md5($u_pwd),'u_phone'=>$u_phone,'u_IDnum'=>$u_IDnum]);
        if ($res){
            return json(array('code'=>'40001','msg'=>'添加成功'));
        }
    }
    //    删除数据
    public function Deluser(){
        $u_id=Request::param('u_id');
        $User=new User();
        $res=$User->Db()->delete($u_id);
        if ($res){
            return json(array('code'=>'50001','msg'=>'删除成功'));
        }
    }
    //批量删除数据
    public function allDeluser(){
        $multipleSelection=Request::param('multipleSelection');
        $User=new User();
        for ($i=0;$i<count($multipleSelection);$i++){
            $u_id=$multipleSelection[$i]["u_id"];
            $res=$User->Db()->where('u_id',$u_id)->delete();
        }
        return json(array('code'=>'50002','msg'=>'删除成功'));
    }
    //重置密码
    public function resetPassword(){
        $u_id=Request::param('u_id');
        $u_pwd=Request::param('u_pwd');
        $User=new User();
        $res=$User->Db()->where('u_id',$u_id)->update(['u_pwd'=>md5($u_pwd)]);
        if ($res){
            return json(array('code'=>'60001','msg'=>'重置后密码为123456'));
        }
    }
    //锁定账户
    public function locking(){
        $u_id=Request::param('u_id');
        $User=new User();
        $res=$User->Db()->where('u_id',$u_id)->update(['u_state'=>'锁定']);
        if ($res){
            return json(array('code'=>'70001','msg'=>'锁定成功'));
        }
    }
    //解锁账户
    public function Unlock(){
        $u_id=Request::param('u_id');
        $User=new User();
        $res=$User->Db()->where('u_id',$u_id)->update(['u_state'=>'使用']);
        if ($res){
            return json(array('code'=>'70002','msg'=>'解锁成功'));
        }
    }
}
