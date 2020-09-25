<?php
namespace app\admin\controller;
//namespace 引入包名
use app\admin\model\Admin;
use app\admin\model\authority;
use app\admin\model\Role;
use app\admin\model\roleAU;
use think\facade\Request;
use think\facade\Db;
use think\facade\View;
class RoleManagement{
//    增加角色
    public function AddRole(Role $role){
        $r_name=Request::param('r_name');
        $r_depict=Request::param('r_depict');
        $res1=$role->db()->where('r_name','=',$r_name)->find();
        if($res1!=null){
            $data=array('code'=>'10002','msg'=>'角色存在');
        }else{
            $res2=$role->db()->insert(['r_name'=>$r_name,'r_depict'=>$r_depict]);
            $data=array('code'=>'10001','msg'=>'添加成功');
        }
        return json($data);
    }
    //修改角色信息
    public function resetRole(Role $role){
        $r_id=Request::param('r_id');
        $r_name=Request::param('r_name');
        $r_depict=Request::param('r_depict');
        $res=$role->Db()->where('r_id',$r_id)->update(['r_name'=>$r_name,'r_depict'=>$r_depict]);
        $data=array('code'=>'30001','msg'=>'修改成功','data'=>$res);
        return json($data);
    }
    //删除角色
    public function delRole(Role $role){
        $r_id=Request::param('r_id');
        $res=$role->Db()->delete($r_id);
        if ($res){
            return json(array('code'=>'40001','msg'=>'删除成功'));
        }else{
            return json(array('code'=>'40002','msg'=>'职位有人存在，不能删除'));
        }
    }
//    获得所有权限
    public function getnowlimt(roleAU $roleAU){
        //所有权限
        $authority=new authority();
        $res=$authority->db()->select();
        $r_id=Request::param('r_id');
        $res1=$roleAU->db()->leftJoin('DD_authority au','DD_roleAU.au_id = au.au_id')->where('r_id',$r_id)->select();
        $data=array("data"=>$res1,"data1"=>$res);
        return json($data);
    }
    //更新权限
    public function uplimit(roleAU $roleAU){
        $nowlimit=Request::param('nowlimit');
        $r_id=Request::param('r_id');
        $res=$roleAU->db()->where('r_id',$r_id)->delete();
        for ($i=0;$i<count($nowlimit);$i++){
            $au_id=$nowlimit[$i]["au_id"];
            $res=$roleAU->Db()->insert(['r_id'=>$r_id,'au_id'=>$au_id]);
        }
        $data=array('code'=>'30001','msg'=>'修改成功','data'=>$res);
        return json($data);
    }
//    搜索
    public function searchRole(Role $role){
        $r_name=Request::param('r_name');
        $res=$role->db()->where('r_name','like',"%".$r_name."%")->select();
        $count =count($res);
        if ($res){
            return json(array('code'=>'50001',"count"=>$count,'data'=>$res));
        }
    }
}
