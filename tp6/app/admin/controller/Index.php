<?php
namespace app\admin\controller;
//namespace 引入包名
use app\admin\model\Admin;
use app\admin\model\Role;
use think\facade\Request;
use think\facade\Db;
use think\facade\View;

//use是引入包名，类文件
class Index{
    //测试路径
    public  function index(){
////        dump("index");
//
//        //数据库操作
//        //1.原生 query/insert/updata/delete/destroy
////        $res=DB::query("select * from user");
////        dump($res);
//        //2.查询构造器
//        //(1)find查询一个//find（参数代表--主键ID为1)
////        $res=Db::table("user")->find(1);
////        $res=Db::table("user")->where("user_id=2")->find();
//        //(2)select查多个（参数，主键ID，[]代表ID符合）
////        $res=Db::table('user')->select([2,5]);
////        (3)where (数符串，数组，对象（字段名，操作符，值）)
////        $res=Db::table("user")->where("user_acc","like","%1%")->select();
//        $res=Db::table("user")
//            ->where([["user_acc","=","11"],
//                ["user_age",">","15"]
//            ])
//            ->order("user_id","desc")
////            ->limit(2,2)
////            ->fetchSql("true")//为true时打印SQL语句
//            ->select();
//
//        dump($res);
//
    }
//    //依赖注入模式
//    public  function login(User $user){
////        $user=new User();//实例化类
//        $res=$user->db()->select();
//        dump($res);
//    }
//
//    public function userlist(){
//        return View::fetch("userlist");
//    }
//    public function swiper(Swiper $swiper){
//$res=$swiper->db()->select();
//        $data=array("data"=>$res);
//        return json($data);
//    }
//获得所有角色
public function allRole(Role $role){
//    public function alluser(User $user){
        $res=$role->db()->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
//        dump($data);
        return json($data);
//        return 11111;
//    }
}
//增加角色时获得除超级管理员以外的角色
    public function selectRole(Role $role){
//    public function alluser(User $user){
        $res=$role->db()->where('r_id','>',1)->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
//        dump($data);
        return json($data);
//    }
    }
//    获得所有员工
    public function allAdmin(Admin $admin){
//    public function alluser(User $user){
        $res=$admin->db()->leftJoin('DD_role r','r.r_id = DD_Admin.r_id')->order('r.r_id')->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
//        dump($data);
        return json($data);
//    }
    }
//    增加员工
public function AddEmployee(Admin $admin){
    $a_acc=Request::param('a_acc');
    $a_name=Request::param('a_name');
    $r_id=Request::param('r_id');
    $res1=$admin->db()->where('a_acc','=',$a_acc)->find();
    if($res1!=null){
        $data=array('code'=>'10002','msg'=>'账号存在');
    }else{
        $res2=$admin->db()->insert(['a_acc'=>$a_acc,'a_name'=>$a_name,'r_id'=>$r_id]);
        $data=array('code'=>'10001','msg'=>'添加成功');
    }
    return json($data);
}
//获得角色名称
public function getNowRole(Role $role){
    $r_id=Request::param('r_id');
    $res=$role->db()->where('r_id','=',$r_id)->find();
    if ($res){
        return json(array('code'=>'20001','data'=>$res));
    }else{
        return json(array('code'=>'20002'));
    }
}
//修改员工信息
public function resetEmployee(Admin $admin){
    $r_id=Request::param('r_id');
    $a_id=Request::param('a_id');
    $a_name=Request::param('a_name');
    $res=$admin->Db()->where('a_id',$a_id)->update(['r_id'=>$r_id,'a_name'=>$a_name]);
    if ($res){
        return json(array('code'=>'30001','data'=>$res));
    }else{
        return json(array('code'=>'30002'));
    }
}
//删除员工
public function delEmployee(Admin $admin){
    $a_id=Request::param('a_id');
    $res=$admin->Db()->delete($a_id);
    if ($res){
        return json(array('code'=>'40001','msg'=>'删除成功'));
    }
}
//查找员工
public function searchEmployee(Admin $admin){
    $a_name=Request::param('a_name');
    $res=$admin->db()->where('a_name','like',"%".$a_name."%")->select();
    $count =count($res);
    if ($res){
        return json(array('code'=>'50001',"count"=>$count,'data'=>$res));
    }
}
}
