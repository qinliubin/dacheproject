<?php


namespace app\admin\controller;


use app\admin\model\Admin;
use app\admin\model\Driver;
use think\facade\Db;
use think\facade\Request;
use think\facade\View;
class Login
{
    //方法名和文件名一致的花不需要传参
    public function Login(){
        $uname=Request::param('username');
        $pwd=Request::param('password');
        $Admin=new Admin();
        $res=$Admin->Db()->where([["a_acc","=",$uname],["a_pwd","=",md5($pwd)]])->find();
        if ($res){
            return json(array('code'=>'20001','ary'=>$res));
        }else{
            return json(array('code'=>'20002'));
        }
    }
//    表格打印
    public function Driver(){
        $Driver =new Driver();
        $res=$Driver->Db()->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
        return json($data);
    }
//    查询司机
    public function Checkdriver(){
        $d_phone=Request::param('d_phone');
        $Driver =new Driver();
        $res=$Driver->Db()->where([["d_phone","=",$d_phone]])->find();
        if ($res){
            return json(array('code'=>'30001','arry'=>$res));
        }else{
            return json(array('code'=>'30002','msg'=>'查无此人'));
        }
    }
//    添加数据
    public function Adddriver(){
        $d_acc=Request::param('d_acc');
        $d_name=Request::param('d_name');
        $d_phone=Request::param('d_phone');
        $d_IDnum=Request::param('d_IDnum');
        $d_drive=Request::param('d_drive');
        $d_driving=Request::param('d_driving');
        $d_pwd=Request::param('d_pwd');
        $Driver =new Driver();
        $res=$Driver->Db()->insert(['d_acc'=>$d_acc,'d_name'=>$d_name,'d_pwd'=>md5($d_pwd),'d_phone'=>$d_phone,'d_IDnum'=>$d_IDnum,'d_drive'=>$d_drive,'d_driving'=>$d_driving]);
        if ($res){
            return json(array('code'=>'40001','msg'=>'添加成功'));
        }
    }

//    删除数据
    public function Deldriver(){
        $d_id=Request::param('d_id');
        $Driver =new Driver();
        $res=$Driver->Db()->delete($d_id);
        if ($res){
            return json(array('code'=>'50001','msg'=>'删除成功'));
        }
    }

    //批量删除数据
    public function allDeldriver(){
        $multipleSelection=Request::param('multipleSelection');
        $Driver =new Driver();
        for ($i=0;$i<count($multipleSelection);$i++){
            $d_id=$multipleSelection[$i]["d_id"];
            $res=$Driver->Db()->where('d_id',$d_id)->delete();
        }
        return json(array('code'=>'50002','msg'=>'删除成功'));
    }

    //重置密码
    public function resetPassword(){
        $d_id=Request::param('d_id');
        $d_pwd=Request::param('d_pwd');
        $Driver =new Driver();
        $res=$Driver->Db()->where('d_id',$d_id)->update(['d_pwd'=>md5($d_pwd)]);
        if ($res){
            return json(array('code'=>'60001','msg'=>'重置后密码为123456'));
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
//        $user=new Passenger();
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
//    public function alluser(Passenger $user){
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
//        $user=new Passenger();
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
//    public function userList(Passenger $user){
//        $loginname=session("loginname");
//        dump($loginname);
//        $res=$user->db()->select();
//        //发送给页面
//        View::assign("user",$res);
//        View::assign("loginname",$loginname);
//        return View::fetch("index");
//    }
//
//    public function updatauser(Passenger $user){
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
//    public function updatesave(Passenger $user){
//        //获取修改的所有个人信息
//        $data=input("post.");
//        dump($data);
//        $user->db()->where ("user_id","=",$data["user_id"])->update($data);
//    }
}
