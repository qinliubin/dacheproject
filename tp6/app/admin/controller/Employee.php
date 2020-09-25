<?php
namespace app\admin\controller;
//namespace 引入包名
use app\admin\model\Admin;
use app\admin\model\Role;
use think\facade\Request;
use think\facade\Db;
use think\facade\View;
class Employee{
    //锁定账户
    public function locking(Admin $admin){
        $a_id=Request::param('a_id');
        $res=$admin->Db()->where('a_id',$a_id)->update(['a_state'=>'锁定']);
        if ($res){
            return json(array('code'=>'70001','msg'=>'锁定成功'));
        }
    }
    //解锁账户
    public function Unlock(Admin $admin){
        $a_id=Request::param('a_id');
        $res=$admin->Db()->where('a_id',$a_id)->update(['a_state'=>'使用']);
        if ($res){
            return json(array('code'=>'70002','msg'=>'解锁成功'));
        }
    }
//    批量删除
    public function allDelEmployee(Admin $admin){
        $multipleSelection=Request::param('multipleSelection');
        for ($i=0;$i<count($multipleSelection);$i++){
            $a_id=$multipleSelection[$i]["a_id"];
            $res=$admin->Db()->where('a_id',$a_id)->delete();
        }
        return json(array('code'=>'50002','msg'=>'删除成功'));
    }
}
