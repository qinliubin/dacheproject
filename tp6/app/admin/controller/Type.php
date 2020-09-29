<?php
namespace app\admin\controller;
//namespace 引入包名
//收费管理
use app\admin\model\Admin;
use app\admin\model\charges;
use app\admin\model\Dictionary;
use think\facade\Request;
use think\facade\Db;
use think\facade\View;
class Type{
    //所有车辆类型
    public function allcarTple(Dictionary $Dictionary){
        $res=$Dictionary->db()->where('ParentID',1)->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
        return json($data);
    }
    //所有查询选项
    public function allselect(Dictionary $dic){
        $res1=$dic->db()->where('ParentID',1)->select();//车辆类型
        $charges=new charges();
        $res2=$charges->db()->group('bi_type')->select();//是否优享型和普通型
        $res3=$charges->db()->group('bi_weather')->select();//天气
        $res4=$charges->db()->group('bi_fastigium')->select();//是否高峰
        $data=array('code'=>'50001',"data"=>$res1,"data1"=>$res2,"data2"=>$res3,"data3"=>$res4);
        return json($data);
    }
    //删除某类型规则
    public function del(Dictionary $Dictionary){
        $di_id=Request::param('di_id');
        $res=$Dictionary->Db()->where('di_id',$di_id)->delete();
        if ($res){
            return json(array('code'=>'40001','msg'=>'删除成功'));
        }
    }
    //添加类型
    public function add(Dictionary $Dictionary){
        $di_name=Request::param('di_name');
        $res1=$Dictionary->db()->where('di_name',$di_name)->where('ParentID',1)->find();
        if($res1!=null){
            $data=array('code'=>'10002','msg'=>'类型存在');
        }else{
            $res2=$Dictionary->db()->insert(['di_name'=>$di_name,'ParentID'=>1]);
            $data=array('code'=>'10001','msg'=>'添加成功');
        }
        return json($data);
    }
    //查询
    public function search(Dictionary $Dictionary){
        $di_name=Request::param('di_name');
        $res=$Dictionary->db()->where('di_name','like',"%".$di_name."%")->where('ParentID',1)->select();
        $count =count($res);
        if ($res){
            return json(array('code'=>'50001',"count"=>$count,'data'=>$res));
        }
    }
}

