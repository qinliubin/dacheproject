<?php
namespace app\admin\controller;
//namespace 引入包名
//收费管理
use app\admin\model\Admin;
use app\admin\model\charges;
use think\facade\Request;
use think\facade\Db;
use think\facade\View;
class ChargesManagement{
    public function allcharges(charges $charges){
        $res=$charges->db()->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
//        dump($data);
        return json($data);
    }
}
