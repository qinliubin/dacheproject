<?php
namespace app\admin\controller;
//namespace 引入包名
use app\index\model\User;

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
}
