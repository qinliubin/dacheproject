<?php


namespace app\admin\controller;


use app\admin\model\User;
use think\facade\Db;
use think\facade\Request;
use think\facade\View;
class Login
{
    //方法名和文件名一致的花不需要传参
    public function Login(){
        $uname=Request::param('username');
        $pwd=Request::param('password');
//        $a=Request::post('');
//       $data = input("username");
//        $param = Request::instance()->param();
//        $data = [
//            'username'=>$request->param('username'),
//            'password'=>$request->param('password')
//        ];
        //dump($data["username"]);
        $User =new User();
        $res=$User->Db()->where([["a_acc","=",$uname],["a_pwd","=",$pwd]])->find();
        if ($res){
            return json(array('code'=>'20001','ary'=>$res));
        }else{
            return json(array('code'=>'20002'));
        }


    }

    public function Enroll(){
        //通过视图访问HTML文件（视图的渲染）
        return View::fetch("/enroll");
    }
    //注册
//    public function checkenroll(){
//        $uname=Request::param("UserName");
//        $upwd=Request::post("password");
//        $user=new User();
//        $res=$user->db()->where([
//            ["user_acc","=",$uname],
//
//        ])->select();
//
//        if(count($res)<=0){
////            dump("注册");
////            return View::fetch("Login");
//            $data = ['user_acc' => $uname,'user_pwd' => $upwd];
//            $result=$user->db()->insert($data);
////            dump($result);
//                return \redirect("../Login");
//
//
//        }else{
////            dump("注册失败");
////            return View::fetch("index");
////            $res=$user->db()->select();
////            //发送给页面
////            View::assign("user",$res);
////            return View::fetch("index");
//            return \redirect("../Enroll");
//        }
//
//    }
//    public function alluser(User $user){
//        $res=$user->db()->select();
//        $count =count($res);
//        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
//        return json($data);
//    }
//    //登录请求
//    public function checkLogin(){
////        $uname=$_POST["UserName"];
////        $upwd=$_POST["password"];
////        dump($uname,$upwd);
//        //获得前台数据（1）param
//        $uname=Request::param("UserName");
////        dump($uname);
//        //post/get取值
//        $upwd=Request::post("password");
////        dump($upwd);
//        $user=new User();
//        $res=$user->db()->where([
//            ["user_acc","=",$uname],
//            ["user_pwd","=",$upwd]
//        ])->select();
//        if(count($res)<=0){
////            dump("登录失败");
////            return View::fetch("Login");
//
//            return \redirect("../Login");
//        }else{
////            dump("登录成功");
////            return View::fetch("index");
////            $res=$user->db()->select();
////            //发送给页面
////            View::assign("user",$res);
////            return View::fetch("index");
//            return redirect("../userList")->with("loginname",$uname);
//        }
//    }
//
//    public function userList(User $user){
//        $loginname=session("loginname");
//        dump($loginname);
//        $res=$user->db()->select();
//        //发送给页面
//        View::assign("user",$res);
//        View::assign("loginname",$loginname);
//        return View::fetch("index");
//    }
//
//    public function updatauser(User $user){
//
//        //获得前台参数
//        $uno=Request::param("uno");
//
//        $res=$user->db()->where("user_id","=",$uno)->select();
//        //发送给界面
//        dump($res);
//        View::assign("user",$res[0]);
//        return View::fetch("userinfo");
//    }
//
//    //修改后保存
//    public function updatesave(User $user){
//        //获取修改的所有个人信息
//        $data=input("post.");
//        dump($data);
//        $user->db()->where ("user_id","=",$data["user_id"])->update($data);
//    }
}
